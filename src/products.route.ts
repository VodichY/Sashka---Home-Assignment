import { Request, Response, Router } from 'express';
import axios, { AxiosResponse, AxiosError } from 'axios';
import * as parserHtml from './parser.html';
import xpath from 'xpath';
const router = Router();
const urlparser = require('url');

router.route("/").post(async (req: Request, res: Response) => {
    const argHtmlPage: Array<Promise<IDataHtml>> = [];
    req.body.forEach((element: string) => {
        argHtmlPage.push(getHtmlPage(element));
    });
    const argResult = await getProductsData(argHtmlPage);
    res.json(argResult);
});

async function getProductsData(argRes: Array<Promise<IDataHtml>>) {
    let argResult: Array<{ title: xpath.SelectedValue, price: xpath.SelectedValue }> = [];
    await Promise.all(argRes).then((values) => {
        values.forEach(element => {
            if (element.nDomen) {
                argResult.push(parserHtml.getDataFromUrl(element));
            }
        });
    });
    return argResult;
}

function getHtmlPage(url: string): Promise<IDataHtml> {
    return axios
        .get(url, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } })
        .then((res: AxiosResponse) => {
            return { 'htmlPage': res.data, 'nDomen': getDomen(url) };
        })
        .catch((_err: AxiosError) => {
            return { 'htmlPage': "", 'nDomen': "" };
        });
};

function getDomen(url: string) {
    const arg = urlparser.parse(url, true);
    return arg.hostname;
}

export interface IDataHtml {
    htmlPage: string;
    nDomen: string;
}

export { router };