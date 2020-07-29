// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { rest } from 'msw'
import { setupServer } from 'msw/node'

let quoteJson = {
    previousClose: '379.47',
    week52High: '417.16',
    week52Low: '197.51',
    high: '399.26',
    low: '376.07',
    latestPrice: '387.46',
    marketCap: 1686473219033,
    latestVolume: 115518,
    open: '392.56',
    avgTotalVolume: 35008229
  }

let statsJson = {
    dividendYield: '0.0085',
    earningsPerShare: '13.09',
    peRatio: '30.95'
  }

let companyJson = {
    companyName: 'Apple, Inc.',
    website: './pal:.htc/twmoppwew',
    description: 'oVtt,i   AyA nnlc  se,ns Podoislpane'
  }

let newsJson = [
    {
      datetime: 1663789885224,
      headline: 'r rk tedyeihtkourtaeiwp gana  tnneetJg Jpg t ria oc\'rhoua rsiaedsh  hm tL uut:ae! bmmt\'nueosnm  wrmarrfPr',
      source: 'esenrsiBd iusnsI',
      url: '90:8f-7-1bpfeeof8fs2lc/41ut-c.a-0d3ori5e/te4ps.smecdx1//ncvah1c6ecdiatwi//lddc'
    },
    {
      datetime: 1611556619815,
      headline: 'oes(teAeaAze\'ilAvehertnhRncwugtostpcses:p rtnu uhei itlnl   d anGiadiladsDrveseowtis em\'o p teteplaies)bosabi r altpe frPdnda  micowt aeog rlie ei e-orc t',
      source: 'Temchmee',
      url: '.71-sfcfac5/6ca/d:6eef7ple/wdlc8stt/e11o-ari-cfci6pdfsh.eoi559ut-vx18746m8d//n'
    },
    {
      datetime: 1630905132953,
      headline: ' tperngAr r izlay lpt dionGLoPM n tohuaieeSonarge nnitPebiTntAthe- eooAealrlt',
      source: 'curamRMo s',
      url: '1hif.ctu8o0eo-/i:ab/4w.-n/acpal/9-ssv4eat/fm0dxdlcacdd45st1rp93b-54e5i08d655/0'
    },
    {
      datetime: 1667553683589,
      headline: 'o\' apDTmonBSeea eopa tt ifscasikinsikCFtnnrhgrnu  OftoiehiS prot r CesAri tetr  Aemp oallEMLseknrehCvo eitee  potmS tg\' tor',
      source: 'Macurs Rmo',
      url: 'wicb9csd4m-vf/e/sro0/bc00pb-a:cn1t4/.6i8ab4f/lh2-3p-x22d18te7td8o/dli930usbe.e'
    },
    {
      datetime: 1620925174970,
      headline: ' pcLcPNAA e TDAAwELOnBppFeo-annPtPahC eSA  nrA  t HIEaEHRunCQ niIseAQAp:GvepEondlgnr3  su. iaee i Sr(hT leC-A c) ls:',
      source: 'ecealhepTtghr',
      url: '/ce.l0oifs6o--2-ud6ctw47:/-d5/2.s2ie29f3s/nleetxaaefch83vdadia4rtcp52/fpa/m1fe'
    }
  ]

let peersJson = ["PHQ","STMF","BIM","GLOGO"];

let historyJson = [
    {
      date: '2020-07-29',
      minute: '09:30',
      price: '390.22'
    },
    {
      date: '2020-07-29',
      minute: '09:31',
      price: '382.34'
    },
    {
      date: '2020-07-29',
      minute: '09:32',
      price: '386.15'
    }]

jest.mock('react-chartjs-2', () => ({
    Line: () => null
  }));

const server = setupServer(
    rest.get('/api/quote/AAPL', (req, res, ctx) => {
        return res(ctx.json(quoteJson))
    }),

    rest.get('/api/stats/AAPL', (req, res, ctx) => {
        return res(ctx.json(statsJson))
    }),

    rest.get('/api/peers/AAPL', (req, res, ctx) => {
        return res(ctx.json(peersJson))
    }),

    rest.get('/api/company/AAPL', (req, res, ctx) => {
        return res(ctx.json(companyJson))
    }),

    rest.get('/api/news/AAPL', (req, res, ctx) => {
        return res(ctx.json(newsJson))
    }),

    rest.get('/api/history/AAPL', (req, res, ctx) => {
        return res(ctx.json(historyJson))
    })
)

beforeAll(() => {
    server.listen();
})
