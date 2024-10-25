import requests
from bs4 import BeautifulSoup

SOUP_PARSER = "html.parser"  # the name of the parser used with BeautifulSoup
SOUND_FILES_URL = "https://www.omniglot.com/soundfiles/"


def get(url: str) -> str:
    """
    Makes a GET request with the url `url` and, if successful, returns the
    resulting text
    """

    # make the request
    response = requests.get(url)

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
