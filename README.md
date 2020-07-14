## Adaptive Stock Ticker
By Justin Rothweiler and Mark Bekker

# Commands
* `npm start` : starts the frontend client on localhost:3000
* `npm run server` : starts the proxy server on localhost:3001
* `npm run dev` : starts up both the frontend client and proxy server in parallel

# Server

This application uses the [iexcloud_api_wrapper](https://github.com/schardtbc/iexcloud_api_wrapper) JavaScript library in a proxy server as a wrapper for calls to IEX Cloud, the API for our financial data. In order to use this library, the following config must be added to a `.env` file (fill in with actual public/secret keys from IEX Cloud):

```
IEXCLOUD_API_VERSION = "stable"
IEXCLOUD_PUBLIC_KEY = "pk_..."
IEXCLOUD_SECRET_KEY = "sk_..." 
```