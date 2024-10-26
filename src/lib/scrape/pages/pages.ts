import { JSDOM } from 'jsdom';

import { get } from "../utils/utils";

import { HomeDocument } from './types';

export const HOME_URL = 'https://www.omniglot.com/soundfiles/';

export async function getHomePage(): Promise<HomeDocument> {
    const resp = await get(HOME_URL);
    const html = resp.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    return document;
}
