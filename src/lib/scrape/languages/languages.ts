import { JSDOM } from 'jsdom';

import { HOME_URL, get } from '../utils/utils';
import { LanguageObject, HomeDocument } from './types';

/**
 * @returns {HomeDocument}
 */
async function getHomePage(): Promise<HomeDocument> {
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
function getMainList(document: HomeDocument): HTMLUListElement {
    const uls = document.getElementsByTagName('ul');
    return uls[1];
}

/**
 * @param {HTMLUListElement} list - the return value of {@link getMainList}
 * @returns {Array<HTMLLIElement>} the `<li>` within the main `<ul>` in
 * {@link HomeDocument}
 */
function getLIs(list: HTMLUListElement): Array<HTMLLIElement> {
    const collection = list.getElementsByTagName('li')
    const array = Array.from(collection);
    return array;
}

/**
 * 
 * @param {HTMLLIElement} li - an `<li>` from the return value of {@link getLIs}
 * @returns {LanguageObject}
 */
function getLanguageFromLI(li: HTMLLIElement): LanguageObject {
    let full;
    let main;
    let dialect = null;

    // gets the text within the <li> (not including html tags)
    // e.g. 'Sardinian (Campidanese): recordings | phrases | language'
    const { textContent } = li;

    // get the full language value, including a dialect if it exists
    // e.g. 'Sardinian (Campidanese)'
    const colonIndex = textContent.indexOf(':');
    full = textContent.slice(0, colonIndex);
    main = full;

    // next, check if the language is a dialect, and if so, extract it. if there is a
    // dialect, it'll be between brackets, like in the example above

    const open = '(';
    const close = ')';

    const isDialect = full.includes(open) && full.includes(close);
    if (isDialect) {
        // get the dialect between the brackets
        const iOpen = full.indexOf(open);
        const iClose = full.indexOf(close);
        dialect = full.slice(iOpen + 1, iClose);

        // remove the dialect from main
        main = main.replace(` (${dialect})`, '');
    }

    return { full, main, dialect };
}

function getResourceFromLI(li: HTMLLIElement): LanguageResources {
    // within the <li> are three <a>s whose hrefs direct us to resources for the
    // given language.
    const anchorsCollection = li.getElementsByTagName('a');
    const anchorsArray = Array.from(anchorsCollection);

    // get the hrefs. these are relative, e.g. '../language/phrases/zulu.php', so we
    // need to build the entire url
    const hrefs = anchorsArray.map((a) => a.href);

    // see https://stackoverflow.com/a/51168403
    const urls = hrefs.map((href) => new URL(href, HOME_URL).href);

    // in terms of pure text, the hyperlinks appear like so:
    // 'recordings | phrases | language'
    const [recordings, phrases, language] = urls;

    return { recordings, phrases, language }
}

async function main(): Promise<Array<LanguageObject>> {
    const document = await getHomePage();

    const mainList = getMainList(document);

    const lis = getLIs(mainList);

    const languages = lis.map(getLanguageFromLI);

    return languages;
}

console.log(main());
