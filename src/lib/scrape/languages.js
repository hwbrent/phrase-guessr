import { JSDOM } from 'jsdom';

import { HOME_URL, get } from './utils.js';

/**
 * A `Document` for the page at {@link HOME_URL}
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

/**
 * @param {HTMLUListElement} list - the return value of {@link getMainList}
 * @returns {Array<HTMLLIElement>} the `<li>` within the main `<ul>` in
 * {@link HomeDocument}
 */
function getLIs(list) {
    const collection = list.getElementsByTagName('li')
    const array = Array.from(collection);
    return array;
}

async function main() {
    const document = await getHomePage();

    const mainList = getMainList(document);

    const lis = getLIs(mainList);

    console.log(lis);
}

main()
