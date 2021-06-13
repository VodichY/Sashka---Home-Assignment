const router = require('express').Router();
const axios = require('axios');
const urlparser = require('url');
const parserHtml = require('./parser.html');

router.route("/").post(async (req, res) => {
    const argHtmlPage = [];
    req.body.forEach((element) => {
        argHtmlPage.push(getHtmlPage(element));
    });
    const argResult = await getProductsData(argHtmlPage); 
    res.json(argResult);
});

async function getProductsData (argRes) {
    let argResult = [];
    await Promise.all(argRes).then((values) => {
        values.forEach(element => {
            if (element.hasOwnProperty('htmlPage')) {
                argResult.push(parserHtml.getDataFromUrl(element));
            }
        });
    });
    return argResult;
}

function getHtmlPage(url) {
    return axios
        .get(url)
        .then((res) => {
            return { 'htmlPage': res.data, 'nDomen': getDomen(url) };
        })
        .catch((err) => {
            return { 'message':err.message };
        });
};

function getDomen(url) {
    const arg = urlparser.parse(url, true);
    return arg.hostname;
}

module.exports = router;