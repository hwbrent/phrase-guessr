import { JSDOM } from 'jsdom';

import { HOME_URL, get } from './utils.js';

/**
 * @summary A `Document` for the page at {@link HOME_URL}
 * @typedef {Document} HomeDocument
 */

/**
 * @returns {HomeDocument}
 */
async function getHomePage() {
    const resp = await get(HOME_URL);
    const html = resp.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    return document;
}

/**
 * @param {HomeDocument} document
 * @returns {HTMLUListElement} the main list on the page that we care about. it's the
 * second <ul> on the page, and contains the language info (as well as hrefs to other
 * important resources)
 */
function getMainList(document) {
    const uls = document.getElementsByTagName('ul');
    return uls[1];
}

async function main() {
    const document = await getHomePage();

    const mainList = getMainList(document);

    console.log(mainList.outerHTML);
}

main()
