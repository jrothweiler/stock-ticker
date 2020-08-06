// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";

let quoteJsonApple = {
  previousClose: "379.47",
  week52High: "417.16",
  week52Low: "197.51",
  high: "399.26",
  low: "376.07",
  latestPrice: "387.46",
  marketCap: 1686473219033,
  latestVolume: 115518,
  open: "392.56",
  avgTotalVolume: 35008229,
  isUSMarketOpen: true,
  latestUpdate: 1596480448000,
};

let statsJsonApple = {
  dividendYield: "0.0085",
  earningsPerShare: "13.09",
  peRatio: "30.95",
};

let companyJsonApple = {
  companyName: "Apple, Inc.",
  website: "./pal:.htc/twmoppwew",
  description: "Apple description",
  exchange: "NASDAQ",
  sector: "Technology",
  currency: "USD",
};

let newsJsonApple = [
  {
    datetime: 1663789885224,
    headline: "Apple headline",
    source: "esenrsiBd iusnsI",
    url:
      "90:8f-7-1bpfeeof8fs2lc/41ut-c.a-0d3ori5e/te4ps.smecdx1//ncvah1c6ecdiatwi//lddc",
  },
  {
    datetime: 1611556619815,
    headline:
      "oes(teAeaAze'ilAvehertnhRncwugtostpcses:p rtnu uhei itlnl   d anGiadiladsDrveseowtis em'o p teteplaies)bosabi r altpe frPdnda  micowt aeog rlie ei e-orc t",
    source: "Temchmee",
    url:
      ".71-sfcfac5/6ca/d:6eef7ple/wdlc8stt/e11o-ari-cfci6pdfsh.eoi559ut-vx18746m8d//n",
  },
  {
    datetime: 1630905132953,
    headline:
      " tperngAr r izlay lpt dionGLoPM n tohuaieeSonarge nnitPebiTntAthe- eooAealrlt",
    source: "curamRMo s",
    url:
      "1hif.ctu8o0eo-/i:ab/4w.-n/acpal/9-ssv4eat/fm0dxdlcacdd45st1rp93b-54e5i08d655/0",
  },
  {
    datetime: 1667553683589,
    headline:
      "o' apDTmonBSeea eopa tt ifscasikinsikCFtnnrhgrnu  OftoiehiS prot r CesAri tetr  Aemp oallEMLseknrehCvo eitee  potmS tg' tor",
    source: "Macurs Rmo",
    url:
      "wicb9csd4m-vf/e/sro0/bc00pb-a:cn1t4/.6i8ab4f/lh2-3p-x22d18te7td8o/dli930usbe.e",
  },
  {
    datetime: 1620925174970,
    headline:
      " pcLcPNAA e TDAAwELOnBppFeo-annPtPahC eSA  nrA  t HIEaEHRunCQ niIseAQAp:GvepEondlgnr3  su. iaee i Sr(hT leC-A c) ls:",
    source: "ecealhepTtghr",
    url:
      "/ce.l0oifs6o--2-ud6ctw47:/-d5/2.s2ie29f3s/nleetxaaefch83vdadia4rtcp52/fpa/m1fe",
  },
];

let peersJsonApple = ["PHQ", "STMF", "BIM", "GLOGO"];

let historyJsonApple = [
  {
    date: "2020-07-29",
    minute: "09:30",
    price: "390.22",
  },
  {
    date: "2020-07-29",
    minute: "09:31",
    price: "382.34",
  },
  {
    date: "2020-07-29",
    minute: "09:32",
    price: "386.15",
  },
];

// second set of data for search purposes

let quoteJsonWork = {
  symbol: "WORK",
  previousClose: "29.30",
  week52High: "41.98",
  week52Low: "15.60",
  high: "30.41",
  low: "28.33",
  latestPrice: "29.70",
  marketCap: 16459214766,
  latestVolume: 58449,
  open: "29.10",
  avgTotalVolume: 20338294,
  isUSMarketOpen: true,
  latestUpdate: 1596480448000,
};

let statsJsonWork = {
  dividendYield: null,
  earningsPerShare: "-1.44",
  peRatio: "-20.23",
};

let companyJsonWork = {
  companyName: "Slack Technologies, Inc.",
  website: "c/thso/wlwptkwac.m.:",
  description: "Slack description",
  exchange: "Other",
  sector: "Technology",
  currency: "USD",
};

let newsJsonWork = [
  {
    datetime: 1613309222719,
    headline: "Slack headline",
    source: ".ncI",
    url:
      "ue799e.6accw1.os40/:x--c64/i2i7picdhld5asc/l/398b24f/7aeto2c/pt52ndm-v-r5tf8es",
  },
  {
    datetime: 1605691116909,
    headline:
      "h   euee tUntc.o i ehaaealeabhtodh  tHiSscBeipSi T .srwettu ledngtkncr r",
    source: "ympsoCnt aFa",
    url:
      "a1/sc8e3co2l31v24ne9se/1dc6p-.3--co95sd31mwri8tihlta4a7/.9uic/ce/a0x/526ap:-1t",
  },
  {
    datetime: 1660809196633,
    headline: " moCcooemL klsHr Ws  i WtnwRts lWanieeercnnoi odeeraroE",
    source: "moekTNrsi weY ",
    url:
      "9ea/dbe/cbpb9oi7d04-tci5a.ceh8/804-abt-3a-2sxc.f/p:10ld/tw458eofcnvulc4rsi/sem",
  },
  {
    datetime: 1615215214313,
    headline:
      "a osq',sa dgrbWpngaenetsy  oliii eesiusueTrtftgnssnewtoenihg t)emlcerslbiuW tk    rSi t p MvGeieabglTgecluiotm  flnc  nol t  iidonttmrre naanune(a liTe stuo,enhS V/Gardoih,baoihati  e",
    source: "cmheeemT",
    url:
      "e/l3-p3an1:c4ctisd7x7b//8a5ct2ocd/.t.fd7f-8e--usce4e1emoli1icpheawc47fbr9/s/vd",
  },
  {
    datetime: 1624993797105,
    headline:
      "yP vuu M rtmaIS) w0onrtotoe6csthrrlg oe asDurm ,r,etipnng yraf/roo rsn faaIeiDso e purinpeti0o,apOsa l eotignpni   beGamG(epise in ritesqco opUsoTgafsBai rOolc Cmele$",
    source: "emmchTee",
    url:
      "l616i//fte1-dic4-sf4c3v77sh6ob1/t:9p/cdfxur-e-1b/smceao78e2tbe1l.4p5a/.dw4n1bi",
  },
];

let peersJsonWork = ["PSOM", "HOVPCI", "YLZP", "CLPG"];

let historyJsonWork = [
  {
    date: "2020-07-30",
    minute: "09:30",
    price: "28.63",
  },
  {
    date: "2020-07-30",
    minute: "09:31",
    price: "29.37",
  },
  {
    date: "2020-07-30",
    minute: "09:32",
    price: "29.22",
  },
];

// Mock an empty function from chartjs to get tests to run without breaking
jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

// mock http server for integration testing
const server = setupServer(
  rest.get("/api/quote/AAPL", (req, res, ctx) => {
    return res(ctx.json(quoteJsonApple));
  }),

  rest.get("/api/stats/AAPL", (req, res, ctx) => {
    return res(ctx.json(statsJsonApple));
  }),

  rest.get("/api/peers/AAPL", (req, res, ctx) => {
    return res(ctx.json(peersJsonApple));
  }),

  rest.get("/api/company/AAPL", (req, res, ctx) => {
    return res(ctx.json(companyJsonApple));
  }),

  rest.get("/api/news/AAPL", (req, res, ctx) => {
    return res(ctx.json(newsJsonApple));
  }),

  rest.get("/api/history/AAPL", (req, res, ctx) => {
    return res(ctx.json(historyJsonApple));
  }),

  rest.get("/api/quote/WORK", (req, res, ctx) => {
    return res(ctx.json(quoteJsonWork));
  }),

  rest.get("/api/stats/WORK", (req, res, ctx) => {
    return res(ctx.json(statsJsonWork));
  }),

  rest.get("/api/peers/WORK", (req, res, ctx) => {
    return res(ctx.json(peersJsonWork));
  }),

  rest.get("/api/company/WORK", (req, res, ctx) => {
    return res(ctx.json(companyJsonWork));
  }),

  rest.get("/api/news/WORK", (req, res, ctx) => {
    return res(ctx.json(newsJsonWork));
  }),

  rest.get("/api/history/WORK", (req, res, ctx) => {
    return res(ctx.json(historyJsonWork));
  }),

  rest.get("/api/quote/BADSYMBOL", (req, res, ctx) => {
    return res(ctx.status(404));
  }),

  rest.get("/api/stats/BADSYMBOL", (req, res, ctx) => {
    return res(ctx.status(404));
  }),

  rest.get("/api/news/BADSYMBOL", (req, res, ctx) => {
    return res(ctx.status(404));
  }),

  rest.get("/api/company/BADSYMBOL", (req, res, ctx) => {
    return res(ctx.status(404));
  }),

  rest.get("/api/peers/BADSYMBOL", (req, res, ctx) => {
    return res(ctx.status(404));
  }),

  rest.get("/api/history/BADSYMBOL", (req, res, ctx) => {
    return res(ctx.status(404));
  }),

  rest.get("/api/quote/MSFT", (req, res, ctx) => {
    return res(
      ctx.json({
        symbol: "MSFT",
        latestPrice: 10.09,
      })
    );
  }),

  rest.get("/api/quote/AMZN", (req, res, ctx) => {
    return res(
      ctx.json({
        symbol: "AMZN",
        latestPrice: 310.09,
      })
    );
  }),

  rest.get("/api/quote/GOOGL", (req, res, ctx) => {
    return res(
      ctx.json({
        symbol: "GOOGL",
        latestPrice: 210.09,
      })
    );
  }),

  rest.get("/api/search/:searchText", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          exchange: "Suggestion Exchange",
          symbol: "WORK",
          securityName: "Suggestion Inc",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
