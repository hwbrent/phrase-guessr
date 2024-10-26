import type { NextApiRequest as Request, NextApiResponse as Response } from 'next';

import { getLanguages } from '../../lib/scrape/languages/languages';

export default async function handler(req: Request, res: Response) {
    // scrape the language data
    const languages = await getLanguages();

    // send it as a response
    res.status(200).json(languages);
}