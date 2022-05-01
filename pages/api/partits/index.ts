import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from '../../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
  res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const result = await executeQuery({
    query: `SELECT par.id, e1.id as id1, e1.nom as equip1, e2.id as id2, e2.nom as equip2,
            SUM(case when j.num in (1,2,3,4,5,6,13,14,15,16,17,18) then j.punts +
              (case when j.resultat = 'doblats' AND j.num in (1,2,3,4,5,6,13,14,15,16,17,18) then j.punts else 0 end) -
              (case when j.resultat = 'perduts' AND j.num in (7,8,9,10,11,12,19,20,21,22,23,24) then j.punts else 0 end) else 0 end) as canes1,
            SUM(case when j.num in (7,8,9,10,11,12,19,20,21,22,23,24) then j.punts +
              (case when j.resultat = 'doblats' AND j.num in (7,8,9,10,11,12,19,20,21,22,23,24) then j.punts else 0 end) - 
              (case when j.resultat = 'perduts' AND j.num in (1,2,3,4,5,6,13,14,15,16,17,18) then j.punts else 0 end) else 0 end) as canes2
            FROM partits par, equips e1, equips e2, jugades j
            WHERE par.equip1 = e1.id AND par.equip2 = e2.id AND j.partit = par.id
            GROUP BY par.id`,
    values: [req.body.content]
  })
  res.json(result)
}