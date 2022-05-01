import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
  res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const result = await executeQuery({
    query: `SELECT * FROM jugades j, jugadors pl WHERE j.jugador = pl.id group by pl.id`,
    values: [req.body.content]
  })
  res.json(result)
}