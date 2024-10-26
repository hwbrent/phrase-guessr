import { JSDOM } from 'jsdom';
import { get } from "../utils/utils";
import { HomeDocument } from './types';

export const HOME_URL = 'https://www.omniglot.com/soundfiles/';

export async function getPage(url: string): Promise<Document> {
    const resp = await get(url);
    const html = resp.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    return document;
}

export async function getHomePage(): Promise<HomeDocument> {
    return await getPage(HOME_URL);
}
