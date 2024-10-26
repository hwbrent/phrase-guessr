import axios, { AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';

// i just went to the url above, then looked in the network tab to see what the header
// value was
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0';

/**
 * @summary Performs a GET request and, if successful, returns the resulting HTML as
 * text
 * @param {string} url - the url of the resource to fetch
 */
export async function get(url: string): Promise<AxiosResponse> {
    // make the request. specifying the header seems to reduce the probability of
    // getting a 403 ('forbidden', i.e. server understood the request but refused to
    // process it)
    const headers = { 'User-Agent': USER_AGENT };

    const config = { headers };
    const response = await axios.get(url, config);

    return response;
}

/**
 * @summary Function to mimic python's `urljoin` function to concatenate segments of
 * a URL
 * @param params Any number of segments of URL. Must be relative
 * @see {@link https://docs.python.org/3/library/urllib.parse.html#urllib.parse.urljoin}
 */
export function urljoin(...params: string[]): URL['href'] {
    let [ base, ...rest ] = params;

    const combined = new URL(rest.join('/'), base);
    return combined.href;
}

export function toHTML(str: string): Document {
    const dom = new JSDOM(str);
    const document = dom.window.document;
    return document;
}
