import { toHTML, urljoin } from "../utils/utils";
import { BASE_URL, getPage } from "../pages/pages";
import { PhrasesURL } from "../languages/types";
import { PagesDocument } from "../pages/types";

async function getPhrasesPage(url: PhrasesURL): Promise<PagesDocument> {
    return getPage(url);
}

/**
 * @returns The main `<table>` in the document, containing the phrase data
 */
function getTable(document: PagesDocument): HTMLTableElement {
    const [table] = document.getElementsByTagName('table');
    return table;
}

function getRows(table: HTMLTableElement): HTMLTableRowElement[] {
    const trs = table.getElementsByTagName('tr'); // rows
    const array = Array.from(trs);

    // remove the first row, since it's the header of the table, and we don't care
    // about it
    array.shift();

    return array;
}

/**
 * @returns The phrase data parsed from {@link td}
 */
function parsePhrases(td: HTMLTableCellElement) {
    // i noticed in the dom there are sometimes rogue <audio> elements which are
    // greyed out. they have the same href as the accompanying <a>. so i think it's
    // probably safest to remove it? idk

    const [audio] = td.getElementsByTagName('audio');
    if (audio) {
        td.removeChild(audio);
    }

    // the phrases are forced onto different lines via <br> tags. so we can split
    // based off that to get an array of phrases
    const rawPhrases = td.innerHTML.split('<br>');

    const data = [];

    for (const raw of rawPhrases) {
        let text; // the actual human-readable phrase
        let mp3 = null;

        // when we did .split earlier, we stopped being able to parse it as HTML. so
        // we have to convert it to html again
        const html = toHTML(raw).body;

        // the text content of the html is what the phrase is. so assign it
        // accordingly
        text = html.textContent.trim();

        // check for an <a>. if there is one, its 'href' will point to an mp3 which
        // we can use
        const [a] = html.getElementsByTagName('a');
        if (a) {
            // grab the href. it's relative to the base url though, so we have to
            // turn it into a full url
            mp3 = urljoin(BASE_URL, a.href);
        }

        data.push({ text, mp3 })
    }

    return data;
}

function getPhraseData(row: HTMLTableRowElement) {
    // the row has two <td>s - one for the english phrase, and one for the equivalents
    // in the other language
    const [ englishData, otherData ] = row.getElementsByTagName('td');

    const english = englishData.textContent;
    const equivalents = parsePhrases(otherData);

    return { english, equivalents };
}

const document = await getPhrasesPage('https://www.omniglot.com/language/phrases/afrikaans.php')
const table = getTable(document);
const rows = getRows(table);
const phrases = rows.map(getPhraseData);
console.log(JSON.stringify(phrases, null, 4));
