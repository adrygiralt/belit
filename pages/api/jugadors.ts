import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
  res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const result = await executeQuery({
    query: `SELECT pl.id,
            pl.nom,
            SUM(j.punts) as totals,
            sum(case when resultat = 'recollit' then 1 else 0 end) as recollit,
            sum(case when resultat = 'matacanat' then 1 else 0 end) as matacanat,
            sum(case when resultat = 'np' then 1 else 0 end) as nps,
            COUNT(*) as tirades 
            FROM jugadors pl, jugades j, partits p 
            WHERE j.jugador = pl.num AND j.partit = p.id AND (p.equip1 = pl.equip AND j.num IN (1,2,3,4,5,6,13,14,15,16,17,18) OR p.equip2 = pl.equip AND j.num IN (7,8,9,10,11,12,19,20,21,22,23,24))
            GROUP BY pl.nom
            ORDER BY totals DESC`,
    values: [req.body.content]
  })
  res.json(result)
}