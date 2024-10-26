import { getPage } from "../pages/pages";
import { PhrasesURL } from "../languages/types";
import { PagesDocument } from "../pages/types";

async function getPhrasesPage(url: PhrasesURL): Promise<PagesDocument> {
    return getPage(url);
}

const result = await getPhrasesPage('https://www.omniglot.com/language/phrases/afrikaans.php')
console.log(result.body.outerHTML);
