import { JSDOM } from 'jsdom';

import { HOME_URL, get } from './utils.js';

async function getHomePage() {
    const resp = await get(HOME_URL);
    const html = resp.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    return document;
}

async function main() {
    const document = await getHomePage();

    console.log(document);
}

main()