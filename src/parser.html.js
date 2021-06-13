const xpath = require('xpath'),
  dom = require('xmldom').DOMParser;
const lodash = require('lodash');

const SelectorData = {
  'www.amazon.com': {
    'price': '\/\/*[@id="priceblock_ourprice"]', 
    'title': '\/\/*[@id="productTitle"]',
    'usefulDataTitle': '[0].firstChild.data',
    'usefulDataPrice': '[0].firstChild.data',
  },
  'www.ebay.com': {
    'price': '\/\/*[@id="prcIsum"]',
    'title':  '\/\/*[@id="itemTitle"]\/text()', 
    'usefulDataTitle': '[0].data',
    'usefulDataPrice': '[0].firstChild.data', 
  }
}

function getDataFromUrl(htmlData) {
  const doc = new dom().parseFromString(htmlData.htmlPage);
  let title = getTitle(doc, htmlData.nDomen);
  let price = getPrice(doc, htmlData.nDomen);
  return {'price': price, 'title': title};
}

function getTitle(doc, nDomen) {
  const titleData = xpath.select(SelectorData[nDomen].title, doc);
  return lodash.get(titleData, SelectorData[nDomen].usefulDataTitle); 
}

function getPrice(doc, nDomen) {
  const priceData = xpath.select(SelectorData[nDomen].price, doc);
  return lodash.get(priceData, SelectorData[nDomen].usefulDataPrice);
}

module.exports = { getDataFromUrl };