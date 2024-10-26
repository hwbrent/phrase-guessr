/**
 * @summary Pseudo-random number generator based on the Linear Congruential Generator
 * algorithm
 * @see {@link https://en.wikipedia.org/wiki/Linear_congruential_generator}
 */
function getRandomNumber(seed: number): number {
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);
    seed = (a * seed + c) % m;
    return seed / m;
}

/**
 * @param date in the format 'yyyy-mm-dd'
 * @returns A random number between 0 and 1. Today's date is used as the seed, so no
 * matter when you call this function on a given day, the output will be the same
 */
export function getRandomNumberForDate(date: string): number {
    // get 'date' in milliseconds since epoch
    const seed = new Date(date).valueOf();

    // use that number as a seed to generate a random number
    const randomNumber = getRandomNumber(seed);

    // return the random number
    return randomNumber;
}
