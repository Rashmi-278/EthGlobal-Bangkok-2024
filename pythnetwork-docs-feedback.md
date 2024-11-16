# Developer Experience with Pyth.Network API's

### Abstract 
Smart contracts which are built upon blockchains open up oppurtunities for a wide range of possible financial tools and mechanisms. Some of which need to consume data from external sources. Pyth Network is an cross-chain publish-subscribe design oracle which sources the price data of digital assets such as Bitcoin/USD and commodities such as Crude oil. 

Pyth Network Sources this data from various institutional firms listed here, https://www.pyth.network/publishers

They make this data available via API's and Pyth Smart Contracts 

### Testing the APIs
Pyth has three API Categories
1. Price feeds
2. Benchmark
3. Entropy

### 1. Price Feeds

Price Feed set of APIs focus on retrieving and managing price data, including Exponential Moving Averages (EMA) and general price feeds. They also handle updating feeds, parsing updates, and managing related fees and time periods.

Currently only EVM Chains are supported.

The following are the listed API's

* getEmaPriceNoOlderThan
* getEmaPriceUnsafe
* getPriceNoOlderThan
* getPriceUnsafe
* getUpdateFee
* parsePriceFeedUpdates
* parsePriceFeedUpdatesUnique
* updatePriceFeeds
* updatePriceFeedsIfNecessary


![image](https://hackmd.io/_uploads/HksXtlIMkg.png)
    
  
#### `getEmaPriceNoOlderThan`
#### `getEmaPriceUnsafe`
#### `getPriceNoOlderThan`
#### `getPriceUnsafe`
#### `getUpdateFee`

**Input:**  
- **ID**: `Crypto.BTC/USD`  
  (ID Hex: `0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43`)  
- **Age**: `600` seconds  
- **Chain**: `Base`  

**Output:**  
```json
{
    "price": 9141311600000n,
    "conf": 4222594000n,
    "expo": -8,
    "publishTime": 1731754339n
}
```



- I tested this same input across multiple endpoints mentioned above to check consistency and response handling.  


#### **Observation:**  
   - Tested a range of `age` values in seconds (from `600` down to `1`). In cases, a **Stale Price** response was received for `age < 60` values.  

#### **Commodities on Base:**  
   - Attempting to retrieve commodity prices (e.g., crude oil) on the `Base` chain resulted in a **Price Not Found** error.

**Feedback:**  
- It would enhance usability if assets that do not exist on a particular chain could be **delisted** or clearly marked as unsupported for that chain.
- We could discover and list the reason for **Error: Price Not Found** and add it as a *Disclaimer*

#### `parsePriceFeedUpdates`
#### `parsePriceFeedUpdatesUnique`
#### `updatePriceFeeds`
#### `updatePriceFeedsIfNecessary`

For priceUpdates, when we need to fetch the price update data from Hermes API:

```
curl -X 'GET' \
  'https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43&encoding=hex&parsed=true&ignore_invalid_price_ids=true' \
  -H 'accept: application/json'
```

Feedback:
It would be helpful if the hex data returned from the API was already prefixed with 0x to align with input parameter format of the `PriceFeedUpdate` API's and avoid extra parsing steps.


### 2.  Benchmarks

This set of API's provide historical data

#### TradingView Routes for Data Integration

The following TradingView API routes were tested and successfully returned valid responses:

- **GET `/v1/shims/tradingview/history`**  
  Retrieves historical data
- **GET `/v1/shims/tradingview/groups`**  
  Fetches data on groups.
- **GET `/v1/shims/tradingview/symbol_info`**  
  Retrieves symbol information.
- **GET `/v1/shims/tradingview/symbols`**  
  Resolves symbol data.
- **GET `/v1/shims/tradingview/search`**  
  Searches for symbols.
- **GET `/v1/shims/tradingview/config`**  
  Provides configuration data for the data feed.
- **GET `/v1/shims/tradingview/streaming`**  
  Fetches streaming data.

#### Observation:
All the above-listed endpoints worked as expected and provided valid responses.

Here’s your input formatted neatly:

---

### Price Feeds & Updates

#### Endpoints Tested:

- **GET `/v1/updates/price/{timestamp}`**  
  Retrieves historical price updates for a provided timestamp.

- **GET `/v1/updates/price/{timestamp}/{interval}`**  
  Retrieves historical price updates for a provided time interval.


#### Input Used:

- **Timestamp**: `1731761220`
- **Interval**: `60`
- **ID**: `e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43`


#### Outcome:  
Both API responses were **successful** and **valid**, providing the expected data for the given inputs.


### 3. Entropy  

Entropy set of API endpoints provide verifiable randomn numbers

#### Observation:
  It appears that the API reference documentation hasn't been updated yet: [Pyth API Reference for Entropy](https://api-reference.pyth.network/entropy).

  I found the documentation for Entropy at this link: [Pyth Network Entropy Docs](https://docs.pyth.network/entropy).

 **Feedback:**
Update documentation from [Fortuna DOURO Labs](https://fortuna.dourolabs.app/docs/) to the API reference section.  

---
