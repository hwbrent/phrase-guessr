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


def get_language_resources() -> dict:
    """
    Gets the info shown under the heading "Recordings of useful foreign phrases" on
    the page located at https://www.omniglot.com/soundfiles/
    """
    soup = get_html(SOUND_FILES_URL)

    # The data we care about is in a <ul> tag. Each language's data is inside that
    # in <li>s. The first <ul> in the page is the menu bar at the top, but the second
    # is the one we want.

    uls = soup.find_all("ul")
    ul = uls[1]

    # All the entries in the list
    lis = ul.find_all("li")

    data = {}

    for li in lis:
        print()
        # the text that you see on the page. we'll get the name of the language from this
        text = li.text

        # get the name of the language. it's in the text before a colon. for example:
        # 'Zulu: recordings | phrases | language'
        colon_index = text.index(":")
        language = text[:colon_index]
        print(language)
        print()


get_language_resources()
