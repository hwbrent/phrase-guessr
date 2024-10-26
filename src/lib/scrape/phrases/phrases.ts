import { getPage } from "../pages/pages";
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

function getPhraseData(row: HTMLTableRowElement) {
    // the row has two <td>s - one for the english phrase, and one for the equivalents
    // in the other language
    const [ englishData, otherData ] = row.getElementsByTagName('td');

    const english = englishData.textContent;

    // there are potentially multiple phrases in the other language. if so, they will
    // be separated by a <br> tag
    const phrasesRaw = otherData.innerHTML.split('<br>');
}

const document = await getPhrasesPage('https://www.omniglot.com/language/phrases/afrikaans.php')
const table = getTable(document);
const rows = getRows(table);
rows.map(getPhraseData);
