import requests

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
