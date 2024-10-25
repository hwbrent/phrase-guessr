import requests
from bs4 import BeautifulSoup

SOUND_FILES_URL = "https://www.omniglot.com/soundfiles/"

# i just went to the url above, then looked in the network tab to see what the header
# value was
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0"

SOUP_PARSER = "html.parser"  # the name of the parser used with BeautifulSoup


def get(url: str) -> str:
    """
    Makes a GET request with the url `url` and, if successful, returns the
    resulting text
    """

    # make the request. specifying the header seems to reduce the probability of getting
    # a 403 ('forbidden', i.e. server understood the request but refused to process it)
    headers = {"User-Agent": USER_AGENT}
    response = requests.get(url, headers=headers)

    # handle any errors
    response.raise_for_status()

    if response.ok:
        return response.text


def get_html(url) -> BeautifulSoup:
    """
    Given a `url`, this function gets the raw HTML of that page and returns
    a new instance of `BeautifulSoup`
    """
    text = get(url)
    soup = BeautifulSoup(text, SOUP_PARSER)
    return soup
