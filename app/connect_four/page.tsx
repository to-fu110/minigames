"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

const cellType = { "N": "N", "B": "B", "W": "W" };

export default function ConnectFour() {

  const [board, setboard] = useState(Array.from({ length: 6 }, () => Array(7).fill(cellType.N)));


  return (
    <main>
      <h1>Connect Four</h1>
      <div className="grid grid-cols-7 w-fit bg-slate-900">
        {board.map((row, rowindex) => (
          row.map((cell: string, cellindex: number) => (
            <button className="border border-gray-500 size-12">
              {cell === cellType.B && <Image className="m-auto" src="/blackOthello.svg" alt="" width={40} height={40} loading='eager' />}
              {cell === cellType.W && <Image className="m-auto" src="/whiteOthello.svg" alt="" width={40} height={40} loading='eager' />}
            </button>
          ))
        ))}
      </div>
      <Link href="/">Back to home</Link>
    </main>
  )
}