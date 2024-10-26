import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

export default function handler(req: Req, res: Res) {
    res.status(200).json({ message: 'hi' })
}