import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * @returns A new `Date` object representing today, but with no time component (meaning
 * the time is midnight)
 */
function getTodayMidnight(): Date {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    const midnight = new Date(year, month, date);
    return midnight;
}

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
 * @returns A random number between 0 and 1. Today's date is used as the seed, so no
 * matter when you call this function on a given day, the output will be the same
 */
function getRandomNumberForToday(): number {
    const seed = getTodayMidnight().valueOf();
    const randomNumber = getRandomNumber(seed);
    return randomNumber;
}

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const randomNumber = getRandomNumberForToday();

    res.status(200).json({ message: `${randomNumber}` })
}
