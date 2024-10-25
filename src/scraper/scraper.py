from urllib.parse import urljoin
from pprint import PrettyPrinter

import requests
from bs4 import BeautifulSoup

pp = PrettyPrinter(indent=4)

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
        # the text that you see on the page. we'll get the name of the language from this
        text = li.text

        # get the name of the language. it's in the text before a colon.
        # examples:
        # "Sardinian (Campidanese)"
        # "Yiddish"
        full_language = text[: text.index(":")]

        # main language is the language part without the dialect (which will be in
        # brackets, if it exists)
        main_language = full_language

        # check if this is a dialect of a main language
        dialect = None

        is_dialect = "(" in full_language and ")" in full_language
        if is_dialect:
            # get the dialect. it's within brackets like so:
            # "Sardinian (Campidanese)"
            dialect_start = text.index("(") + 1
            dialect_end = text.index(")")
            dialect = text[dialect_start:dialect_end]

            # remove the dialect from the main language
            main_language = main_language.replace(f" ({dialect})", "")

        # the three components of the language. examples:
        # ('Welsh', 'Welsh', None)
        # ('Portuguese (Brazilian)', 'Portuguese', 'Brazilian')
        language_components = tuple([full_language, main_language, dialect])

        # get the 'recordings', 'phrases' and 'language' urls. they are
        # within three anchor tags
        anchors = li.find_all("a")

        # the hrefs are relative to the url of this page.
        # example: '../language/phrases/zulu.php'
        # so we need to convert them to full urls
        relative_hrefs = [a["href"] for a in anchors]
        complete = lambda href: urljoin(SOUND_FILES_URL, href)
        full_hrefs = [complete(href) for href in relative_hrefs]

        recordings, phrases, language = full_hrefs

        data[language_components] = {
            "recordings": recordings,
            "phrases": phrases,
            "language": language,
        }

    return data


pp.pprint(get_language_resources())
