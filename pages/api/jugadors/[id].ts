import { NextApiRequest, NextApiResponse } from "next";

export default function getPlayerById(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  res.json({id: req.query.id, method: req.method})
}