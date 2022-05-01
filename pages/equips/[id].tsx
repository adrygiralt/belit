import Link from 'next/link'
import { NextPageContext } from "next"
import { useEffect, useState } from "react"
import { ListFormat } from "typescript"

export interface HomeProps {
   playerList: Player[] | undefined;
   teamnom: string;
}

// KindaCode.com
export default function Home({playerList, teamnom}: HomeProps) {
  return (
    <div className="container p-3">
      <h1><Link as='/' href="/"><a>Inici</a></Link> &gt; {teamnom}</h1>
      <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Punts totals</th>
      <th scope="col">Tirades</th>
      <th scope="col">Recollit</th>
      <th scope="col">Matacanat</th>
      <th scope="col">NPs</th>
    </tr>
  </thead>
  <tbody>
    {playerList?.map(player => (
      <tr key={player.id}>
        <td>{player.nom}</td>
        <td>{player.totals}</td>
        <td>{player.tirades}</td>
        <td>{player.recollit}</td>
        <td>{player.matacanat}</td>
        <td>{player.nps}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export interface Player {
  id: number;
  nom: string;
  totals: number;
  tirades: number;
  recollit: number;
  matacanat: number;
  nps: number;
}

export interface Equip {
  id: number;
  nom: string;
}

Home.getInitialProps = async (ctx : NextPageContext) => {
  const teamid : string = ctx.query.id as string;
  const response = await fetch("http://localhost:3000/api/equips/" + teamid + "/jugadors")
  const playerList: Player[] | undefined = await response.json()
  const response2 = await fetch("http://localhost:3000/api/equips/" + teamid)
  const equip : Equip[] | undefined = await response2.json()
  return { playerList, teamnom: equip?.[0].nom }
}