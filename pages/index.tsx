import Link from 'next/link'
import { useEffect, useState } from "react"
import { ListFormat } from "typescript"

export interface HomeProps {
   partitsList: Partit[] | undefined
}

// KindaCode.com
export default function Home({partitsList}: HomeProps) {

  return (
    <div className="container p-3">
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Partits</th>
        </tr>
      </thead>
      <tbody>
        {partitsList?.map(partit => (
          <tr key={partit.id}>
            <td><b><Link as={`/equips/${partit.id1}`} href="/equips/[id]"><a>{partit.equip1}</a></Link></b> {partit.canes1} - {partit.canes2} <b><Link as={`/equips/${partit.id2}`} href="/equips/[id]"><a>{partit.equip2}</a></Link></b></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export interface Partit {
  id: number;
  id1: number;
  equip1: string;
  id2: number;
  equip2: string;
  canes1: number;
  canes2: number;
}

Home.getInitialProps = async () => {
  const response = await fetch("http://localhost:3000/api/partits")
  const partitsList: Partit[] | undefined = await response.json()

  return { partitsList }
}