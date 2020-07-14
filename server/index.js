const express = require('express');
const bodyParser = require('body-parser');
const iex = require( 'iexcloud_api_wrapper' )

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/quote/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log("fetching quote")
    const quoteData = await iex.quote(symbol);
    console.log("done fetching quote")
    res.setHeader('Content-Type', 'application/json');
    const { previousClose, week52High, week52Low, high, low, latestPrice, latestVolume, marketCap, open, avgTotalVolume } = quoteData;
    res.send(JSON.stringify({ previousClose, week52High, week52Low, high, low, latestPrice, marketCap, latestVolume, open, avgTotalVolume }));
});

app.get('/api/stats/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log("fetching stats")
    const statData = await iex.keyStats(symbol);
    console.log("done fetching stats")
    res.setHeader('Content-Type', 'application/json');
    const { dividendYield, ttmEPS, peRatio } = statData;
    res.send(JSON.stringify({ dividendYield, earningsPerShare: ttmEPS, peRatio}));
});

app.get('/api/company/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log("fetching company")
    const companyData = await iex.company(symbol);
    console.log("done fetching company")
    res.setHeader('Content-Type', 'application/json');
    const { companyName, website, description } = companyData;
    res.send(JSON.stringify({ companyName, website, description }));
});

app.get('/api/news/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log("fetching news")
    const newsData = await iex.news(symbol, 5);
    console.log("done fetching news")
    res.setHeader('Content-Type', 'application/json');
    const returnData = newsData.map(article => {
        const {datetime, headline, source, url} = article;
        return {datetime, headline, source, url};
    })
    
    res.send(JSON.stringify(returnData));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);