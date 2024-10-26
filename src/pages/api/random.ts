import type { NextApiRequest, NextApiResponse } from 'next'

function getTodayMidnight() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    const midnight = new Date(year, month, date);
    return midnight;
}

type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: `${getTodayMidnight()}` })
}