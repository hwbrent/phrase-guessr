import axios, { AxiosResponse } from 'axios';

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
 * @summary Fetches the basic info from {@link HOME_URL}
 * @description Basically just the languages and the urls of the three
 * resources available for each one
 */
function getBascInfo() {}
