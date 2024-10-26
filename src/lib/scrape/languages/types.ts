
/**
 * An object containing data on a unique language
 */
export type Language = {
    /**
     * The full string representing the language, including {@link dialect} in brackets
     * (if there is one)
     * @example "Chinese (Cantonese)"
     */
    full: string;

    /**
     * The main component of {@link full}, i.e. {@link full} without {@link dialect} (if there is one)
     * @example "Chinese"
     */
    main: string;

    /**
     * The component of {@link full} which is between brackets
     * @example "Cantonese"
     */
    dialect?: string;
}

/**
 * A URL to a page containing a table of "Useful <language> phrases"
 * @example 'https://www.omniglot.com/language/phrases/kannada.php'
 */
export type PhrasesURL = URL['href'];

/**
 * An object containing URLs pointing to a given language's further resources within
 * {@link https://www.omniglot.com}
 */
export type Resource = {
    /**
     * A URL to a zip file containing mp3 recordings of a language
     * @example 'https://www.omniglot.com/soundfiles/gujarati/gujaratiphrases.zip'
     */
    recordings: URL['href'];

    /**
     * A URL to a page containing a table of "Useful <language> phrases"
     * @example 'https://www.omniglot.com/language/phrases/kannada.php'
     */
    phrases: PhrasesURL;

    /**
     * A URL to a page containing background info on the language
     * @example 'https://www.omniglot.com/writing/manx.htm'
     */
    language: URL['href'];
}

export type LanguageToResourceMap = Map<Language, Resource>;
