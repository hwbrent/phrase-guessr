
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
