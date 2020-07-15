const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const iex = require( 'iexcloud_api_wrapper' );
const socketIo = require('socket.io');

const app = express();

const delay = t => new Promise(resolve => setTimeout(resolve, t));

// Given an IEX fetch function (i.e. quote, keyStats, etc.), provides a wrapper that 
// handles 429 rate limiting errors. 
async function fetchWrapper(...args) {
    try {
        // call the IEX Cloud function with the provided args, and return the data if no problems
        let [fetchFunction, ...functionArgs] = args;
        let data = await fetchFunction(...functionArgs);
        return data;
    } catch (e) {
        if (e.response.status === 429) {
            // in the case of Too Many Requests, wait 100ms and try again
            await delay(100);
            return fetchWrapper(...args);
        } else {
            // Propogate all other errors
            throw e;
        }
    }
}


app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = socketIo(server);

app.get('/api/quote/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const quoteData = await fetchWrapper(iex.quote, symbol);
        const { previousClose, week52High, week52Low, high, low, latestPrice, latestVolume, marketCap, open, avgTotalVolume } = quoteData;
        res.json({ previousClose, week52High, week52Low, high, low, latestPrice, marketCap, latestVolume, open, avgTotalVolume });
    } catch (e) {
        res.sendStatus(e.response.status)
    }
});

app.get('/api/stats/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const statData = await fetchWrapper(iex.keyStats, symbol);
        const { dividendYield, ttmEPS, peRatio } = statData;
        res.json({ dividendYield, earningsPerShare: ttmEPS, peRatio});
    } catch (e) {
        res.sendStatus(e.response.status);
    }
});

app.get('/api/company/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const companyData = await fetchWrapper(iex.company, symbol);
        const { companyName, website, description } = companyData;
        res.json({ companyName, website, description });
    } catch (e) {
        res.sendStatus(e.response.status);
    }
    
});

app.get('/api/news/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const newsData = await fetchWrapper(iex.news, symbol, 5);
        const returnData = newsData.map(article => {
            const {datetime, headline, source, url} = article;
            return {datetime, headline, source, url};
        })
        res.json(returnData);
    } catch (e) {
        res.sendStatus(e.response.status);
    }
});

io.on("connection", (socket) => {
    console.log("A client has connected");

    let subscribeToSymbol = (symbol) => {
        return setInterval(async () => {
            const quoteData = await fetchWrapper(iex.quote, symbol);
            const { previousClose, week52High, week52Low, high, low, latestPrice, latestVolume, marketCap, open, avgTotalVolume } = quoteData;
            socket.emit('realTimeQuoteData', { previousClose, week52High, week52Low, high, low, latestPrice, latestVolume, marketCap, open, avgTotalVolume });
        }, 1000)
    }

    let intervalId = null;
    

    server.on("newSymbol", (newSym) => {
        console.log("new symbol set:", newSym)
        clearInterval(intervalId);
        let intervalId = subscribeToSymbol(newSym);
    })

    socket.on("disconnect", () => {
        console.log("A client has disconnected");
        clearInterval(intervalId);
    })
})

server.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);