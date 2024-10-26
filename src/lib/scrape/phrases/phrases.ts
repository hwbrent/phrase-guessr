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
    return array;
}

const document = await getPhrasesPage('https://www.omniglot.com/language/phrases/afrikaans.php')
const table = getTable(document);
const rows = getRows(table);
console.log(rows);
