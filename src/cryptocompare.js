
var baseUrl = 'https://min-api.cryptocompare.com/data/';

function fetchJSON(url) {
  return fetch(url).then(function (res) {
    if (!res.ok) {
      throw new Error(res.status + ' ' + res.statusText);
    }
    return res.json();
  }).then(function (body) {
    if (body.Response === 'Error') throw body.Message;
    return body;
  });
}

function coinList() {
  var url = baseUrl + 'all/coinlist';
  return fetchJSON(url);
}

function exchangeList() {
  var url = baseUrl + 'all/exchanges';
  return fetchJSON(url);
}

function price(fsym, tsyms, options) {
  options = options || {};
  var url = baseUrl + 'price?fsym=' + fsym + '&tsyms=' + tsyms;
  if (options.exchanges) url += '&e=' + options.exchanges;
  if (options.tryConversion === false) url += '&tryConversion=false';
  return fetchJSON(url);
}

function priceMulti(fsyms, tsyms, options) {
  options = options || {};
  var url = baseUrl + 'pricemulti?fsyms=' + fsyms + '&tsyms=' + tsyms;
  if (options.exchanges) url += '&e=' + options.exchanges;
  if (options.tryConversion === false) url += '&tryConversion=false';
  return fetchJSON(url);
}

function priceFull(fsyms, tsyms, options) {
  options = options || {};
  var url = baseUrl + 'pricemultifull?fsyms=' + fsyms + '&tsyms=' + tsyms;
  if (options.exchanges) url += '&e=' + options.exchanges;
  if (options.tryConversion === false) url += '&tryConversion=false';
  // We want the RAW data, not the DISPLAY data:
  return fetchJSON(url).then(function (result) {
    return result.RAW;
  });
}

function priceHistorical(fsym, tsyms, time, options) {
  options = options || {};
  time = dateToTimestamp(time);
  var url = baseUrl + 'pricehistorical?fsym=' + fsym + '&tsyms=' + tsyms + '&ts=' + time;
  if (options.exchanges) url += '&e=' + options.exchanges;
  if (options.tryConversion === false) url += '&tryConversion=false';
  // The API returns json with an extra layer of nesting, so remove it
  return fetchJSON(url).then(function (result) {
    return result[fsym];
  });
}

function generateAvg(fsym, tsym, e, tryConversion) {
  var url = baseUrl + 'generateAvg?fsym=' + fsym + '&tsym=' + tsym + '&e=' + e;
  if (tryConversion === false) url += '&tryConversion=false';
  return fetchJSON(url).then(function (result) {
    return result.RAW;
  });
}

function topPairs(fsym, limit) {
  var url = baseUrl + 'top/pairs?fsym=' + fsym;
  if (limit) url += '&limit=' + limit;
  return fetchJSON(url).then(function (result) {
    return result.Data;
  });
}

function topExchanges(fsym, tsym, limit) {
  var url = baseUrl + 'top/exchanges?fsym=' + fsym + '&tsym=' + tsym;
  if (limit) url += '&limit=' + limit;
  return fetchJSON(url).then(function (result) {
    return result.Data;
  });
}

function histoDay(fsym, tsym, options) {
  options = options || {};
  if (options.timestamp) options.timestamp = dateToTimestamp(options.timestamp);
  var url = baseUrl + 'histoday?fsym=' + fsym + '&tsym=' + tsym;
  if (options.exchange) url += '&e=' + options.exchange;
  if (options.limit === 'none') url += '&allData=true';else if (options.limit) url += '&limit=' + options.limit;
  if (options.tryConversion === false) url += '&tryConversion=false';
  if (options.aggregate) url += '&aggregate=' + options.aggregate;
  if (options.timestamp) url += '&toTs=' + options.timestamp;
  return fetchJSON(url).then(function (result) {
    return result.Data;
  });
}

function histoHour(fsym, tsym, options) {
  options = options || {};
  if (options.timestamp) options.timestamp = dateToTimestamp(options.timestamp);
  var url = baseUrl + 'histohour?fsym=' + fsym + '&tsym=' + tsym;
  if (options.exchange) url += '&e=' + options.exchange;
  if (options.limit) url += '&limit=' + options.limit;
  if (options.tryConversion === false) url += '&tryConversion=false';
  if (options.aggregate) url += '&aggregate=' + options.aggregate;
  if (options.timestamp) url += '&toTs=' + options.timestamp;
  return fetchJSON(url).then(function (result) {
    return result.Data;
  });
}

function histoMinute(fsym, tsym, options) {
  options = options || {};
  if (options.timestamp) options.timestamp = dateToTimestamp(options.timestamp);
  var url = baseUrl + 'histominute?fsym=' + fsym + '&tsym=' + tsym;
  if (options.exchange) url += '&e=' + options.exchange;
  if (options.limit) url += '&limit=' + options.limit;
  if (options.tryConversion === false) url += '&tryConversion=false';
  if (options.aggregate) url += '&aggregate=' + options.aggregate;
  if (options.timestamp) url += '&toTs=' + options.timestamp;
  return fetchJSON(url).then(function (result) {
    return result.Data;
  });
}

function dateToTimestamp(date) {
  if (!(date instanceof Date)) throw new Error('timestamp must be an instance of Date.');
  return Math.floor(date.getTime() / 1000);
}

module.exports = {
  coinList: coinList,
  exchangeList: exchangeList,
  price: price,
  priceMulti: priceMulti,
  priceFull: priceFull,
  priceHistorical: priceHistorical,
  generateAvg: generateAvg,
  topPairs: topPairs,
  topExchanges: topExchanges,
  histoDay: histoDay,
  histoHour: histoHour,
  histoMinute: histoMinute
};
