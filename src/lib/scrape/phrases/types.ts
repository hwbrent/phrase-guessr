
export type TargetLanguagePhrase = {
    /**
     * The phrase in the target language corresponding to the english
     * @example "My skeertuig is vol palings"
     */
    text: string;

    /**
     * The URL to an mp3 file of the {@link text} phrase being spoken out loud
     * @example "https://www.omniglot.com/soundfiles/afrikaans/hovercraft_af.mp3"
     */
    mp3?: URL['href']
}

/**
 * Data for one English phrase and its equivalent(s) in the other given language
 */
export type PhraseData = {
    /**
     * The english phrase
     * @example
     * "My hovercraft is full of eels" // yes that's an actual phrase on the side :D
     */
    english: string;

    equivalents: TargetLanguagePhrase[]
}
