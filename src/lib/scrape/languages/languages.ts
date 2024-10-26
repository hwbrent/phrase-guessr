import { getHomePage, HOME_URL } from '../pages/pages';
import { HomeDocument } from '../pages/types';

import { Language, Resource, LanguageToResourceMap } from './types';

/**
 * @returns the main list on the page that we care about. it's the second <ul> on
 * the page, and contains the language info (as well as hrefs to other important
 * resources)
 */
function getMainList(document: HomeDocument): HTMLUListElement {
    const uls = document.getElementsByTagName('ul');
    return uls[1];
}

/**
 * @param list - the return value of {@link getMainList}
 * @returns the `<li>` within the main `<ul>` in {@link HomeDocument}
 */
function getLIs(list: HTMLUListElement): HTMLLIElement[] {
    const collection = list.getElementsByTagName('li')
    const array = Array.from(collection);
    return array;
}

/**
 * @param li - an `<li>` from the return value of {@link getLIs}
 */
function getLanguageFromLI(li: HTMLLIElement): Language {
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

function getResourceFromLI(li: HTMLLIElement): Resource {
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

/**
 * @summary Gets the pertinent `<li>`s from the main page (at {@link HOME_URL})
 */
async function getMainLIs(): Promise<HTMLLIElement[]> {
    const document = await getHomePage();
    const mainList = getMainList(document);
    const lis = getLIs(mainList);
    return lis;
}

const mapLanguages = (lis) => lis.map(getLanguageFromLI);

export async function getLanguages(): Promise<Language[]> {
    const lis = await getMainLIs();
    return mapLanguages(lis);
}

const mapResources = (lis) => lis.map(getResourceFromLI);

export async function getResources(): Promise<Resource[]> {
    const lis = await getMainLIs();
    return mapResources(lis);
}

/**
 * @returns A complete {@link LanguageToResourceMap map} whose keys are
 * {@link Language}s and values are {@link Resource}
 */
async function getLanguagesAndResources(): Promise<LanguageToResourceMap> {
    const lis = await getMainLIs();

    const languages = mapLanguages(lis);
    const resources = mapResources(lis);

    // Create pairs from each entry in 'languages' and 'resources'
    const pairs = languages.map((lang, index) => [lang, resources[index]]);

    return new Map(pairs)
}

/**
 * @returns The resources corresponding to the given language in the {@link obj} param
 */
async function getResourceFromLanguage(obj: Language): Promise<Resource> {
    // grab the full language name
    const { full } = obj;

    // grab the <li>s
    const lis = await getMainLIs();

    // grab the <li> which has the given full language name in it
    const li = lis.find(el => el.textContent.includes(full));

    // convert the <li> into a resource, and return it
    const resource = getResourceFromLI(li);
    return resource;
}
