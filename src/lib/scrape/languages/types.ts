
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
 * An object containing URLs pointing to a given language's further resources within
 * {@link https://www.omniglot.com}
 */
export interface LanguageResources {
    /**
     * A URL to a zip file containing mp3 recordings of the given language
     */
    recordings: URL["href"];

    /**
     * A URL to a page containing a table of "Useful <language> phrases"
     */
    phrases: URL["href"];

    /**
     * A URL to a page containing background info on the language
     */
    language: URL["href"];
}

/**
 * A `Document` for the page at https://www.omniglot.com/soundfiles/
 */
export type HomeDocument = Document;
