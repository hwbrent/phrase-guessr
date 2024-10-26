
/**
 * An object containing data on a unique language
 */
export interface LanguageObject {
    /**
     * The full string representing the language, including the dialect in brackets
     * (if there is one)
     */
    full: string;

    /**
     * The main component of `full`, i.e. `full` without the dialect (if there is one)
     */
    main: string;

    /**
     * The component of `full` which is between brackets
     */
    dialect: string | null;
}

/**
 * A URL to a zip file containing mp3 recordings of a language
 * 
 * @example 'https://www.omniglot.com/soundfiles/gujarati/gujaratiphrases.zip'
 */
export type RecordingsResourceURL = URL['href'];

/**
 * A URL to a page containing a table of "Useful <language> phrases"
 * 
 * @example 'https://www.omniglot.com/language/phrases/kannada.php'
 */
export type PhrasesResourceURL = URL['href'];

/**
 * A URL to a page containing background info on the language
 * 
 * @example 'https://www.omniglot.com/writing/manx.htm'
 */
export type LanguageResourceURL = URL['href'];

/**
 * An object containing URLs pointing to a given language's further resources within
 * {@link https://www.omniglot.com}
 */
export interface LanguageResources {
    recordings: RecordingsResourceURL;
    phrases:    PhrasesResourceURL;
    language:   LanguageResourceURL;
}

export type LanguageToResourceMap = Map<LanguageObject, LanguageResources>;

/**
 * A `Document` for the page at https://www.omniglot.com/soundfiles/
 */
export type HomeDocument = Document;
