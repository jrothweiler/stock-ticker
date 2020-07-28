const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const iex = require("iexcloud_api_wrapper");
const socketIo = require("socket.io");

const app = express();

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

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

async function getQuoteData(symbol) {
  const [quoteData, dailyData] = await Promise.all([
    fetchWrapper(iex.quote, symbol),
    fetchWrapper(iex.history, symbol, { period: "1d", chartCloseOnly: true }),
  ]);
  // some data has null entries, so filter it out before processing it
  const filteredDailyData = dailyData.filter((minute) => minute.high !== null);

  // some data has been deprecated from the quote api, so as a workaround, calculate these fields off of the current day's price data minute by minute.
  const high = Math.max(...filteredDailyData.map((minute) => minute.high));
  const low = Math.min(...filteredDailyData.map((minute) => minute.low));
  const latestVolume = filteredDailyData.reduce(
    (acc, currentMinute) => currentMinute.volume + acc,
    0
  );
  const open = filteredDailyData[0].open || null;
  const {
    previousClose,
    week52High,
    week52Low,
    latestPrice,
    marketCap,
    avgTotalVolume,
  } = quoteData;
  return {
    previousClose: previousClose.toFixed(2),
    week52High: week52High.toFixed(2),
    week52Low: week52Low.toFixed(2),
    high: high.toFixed(2),
    low: low.toFixed(2),
    latestPrice: latestPrice.toFixed(2),
    marketCap,
    latestVolume,
    open: open.toFixed(2),
    avgTotalVolume,
  };
}


//iex.marketSymbols().then((data) => console.log(data));
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = socketIo(server);

app.get("/api/quote/:symbol", async (req, res) => {
  console.log("app.get quotes");
  const symbol = req.params.symbol;
  try {
    let quoteData = await getQuoteData(symbol);
    res.json(quoteData);
  } catch (e) {
    res.sendStatus(e.response.status);
  }
});

app.get("/api/stats/:symbol", async (req, res) => {
  console.log("app.get stats");
  const symbol = req.params.symbol;
  try {
    const statData = await fetchWrapper(iex.keyStats, symbol);
    const { dividendYield, ttmEPS, peRatio } = statData;
    res.json({ dividendYield: dividendYield?.toFixed(4) || null, earningsPerShare: ttmEPS.toFixed(2), peRatio: peRatio.toFixed(2) });
  } catch (e) {
    res.sendStatus(e.response.status);
  }
});

app.get("/api/company/:symbol", async (req, res) => {
  console.log("app.get company");
  const symbol = req.params.symbol;
  try {
    const companyData = await fetchWrapper(iex.company, symbol);
    const { companyName, website, description } = companyData;
    res.json({ companyName, website, description });
  } catch (e) {
    res.sendStatus(e.response.status);
  }
});

app.get("/api/news/:symbol", async (req, res) => {
  console.log("app.get news");
  const symbol = req.params.symbol;
  try {
    const newsData = await fetchWrapper(iex.news, symbol, 5);
    const returnData = newsData.map((article) => {
      const { datetime, headline, source, url } = article;
      return { datetime, headline, source, url };
    });
    res.json(returnData);
  } catch (e) {
    res.sendStatus(e.response.status);
  }
});

app.get("/api/history/:symbol", async (req, res) => {
  console.log("app.get history");
  const symbol = req.params.symbol;
  let period = req.query.period;
  // if the user wants 5d, give them minute by minute data
  if (period === "5D") {
    period = "5DM";
  }

  try {
    const historyData = await fetchWrapper(iex.history, symbol, { period, chartCloseOnly: true });
    const returnData = historyData.map((day) => {
      let price = day.average?.toFixed(2) || day.close?.toFixed(2) || null;
      return {
        date: day.date,
        minute: day.minute,

        // if the data is minute to minute, go by average price for that period
        // on a day by day frequency, go by the closing price
        price: price,
      };
    });
    res.json(returnData);
  } catch (e) {
    res.sendStatus(e.response.status);
  }
});

app.get("/api/peers/:symbol", async (req, res) => {
  console.log("app.get peers");
  const symbol = req.params.symbol;
  try {
    const peersData = await fetchWrapper(iex.peers, symbol, 5);
    res.json(peersData);
  } catch (e) {
    res.sendStatus(e.response.status);
  }
});

app.get("/api/quote/:symbol", async (req, res) => {
  console.log("app.get search");
  const symbol = req.params.symbol;
  try {
    const searchData = await fetchWrapper(iex.peers, symbol);
    res.json(searchData);
    console.log(searchData);
  } catch (e) {
    res.sendStatus(e.response.status);
  }
});

io.on("connection", (socket) => {
  console.log("A client has connected");

  let subscribeToSymbol = (symbol) => {
    return setInterval(async () => {
      let quoteData = await getQuoteData(symbol);
      socket.emit("realTimeQuoteData", quoteData);
    }, 5000);
  };

  let intervalId = null;

  socket.on("newSymbol", (newSym) => {
    console.log("new symbol set:", newSym);
    clearInterval(intervalId);
    intervalId = subscribeToSymbol(newSym);
  });

  socket.on("disconnect", () => {
    console.log("A client has disconnected");
    clearInterval(intervalId);
  });
});

server.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
