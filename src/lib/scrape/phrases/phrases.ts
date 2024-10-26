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

const document = await getPhrasesPage('https://www.omniglot.com/language/phrases/afrikaans.php')
const table = getTable(document);
console.log(table.outerHTML);
