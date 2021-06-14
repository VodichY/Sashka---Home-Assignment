import lodash from 'lodash';
import xpath from 'xpath';
import xmldom from 'xmldom';
import { IDataHtml } from './products.route';
const dom = xmldom.DOMParser;

interface ISelectorData {
  [key: string]: {
    price: string;
    title: string;
    usefulDataTitle: string;
    usefulDataPrice: string;
  }
}

const SelectorData: ISelectorData = {
  'www.amazon.com': {
    'price': '\/\/*[@id="priceblock_ourprice"]',
    'title': '\/\/*[@id="productTitle"]',
    'usefulDataTitle': '[0].firstChild.data',
    'usefulDataPrice': '[0].firstChild.data',
  },
  'www.ebay.com': {
    'price': '\/\/*[@id="prcIsum"]',
    'title': '\/\/*[@id="itemTitle"]\/text()',
    'usefulDataTitle': '[0].data',
    'usefulDataPrice': '[0].firstChild.data',
  }
}

function getDataFromUrl(htmlData: IDataHtml) {
  const doc: Document = new dom().parseFromString(htmlData.htmlPage);
  let title = getTitle(doc, htmlData.nDomen);
  let price = getPrice(doc, htmlData.nDomen);
  return { 'price': price, 'title': title };
}

function getTitle(doc: Document, nDomen: string) {
  const selectorData = SelectorData[nDomen];
  if (!selectorData) {
    throw new Error('selector data is not defined');
  }
  const titleData = xpath.select(selectorData.title, doc);
  return lodash.get(titleData, selectorData.usefulDataTitle);
}

function getPrice(doc: Document, nDomen: string) {
  const selectorData = SelectorData[nDomen];
  if (!selectorData) {
    throw new Error('selector data is not defined');
  }
  const priceData = xpath.select(selectorData.price, doc);
  return lodash.get(priceData, selectorData.usefulDataPrice);
}

export { getDataFromUrl };