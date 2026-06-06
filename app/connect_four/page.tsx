"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import red from "../../public/connect_four/redpiece.svg"
import blue from "../../public/connect_four/bluepiece.svg"

const cellType = { "N": "N", "R": "R", "B": "B" };

export default function ConnectFour() {

  const [board, setboard] = useState(Array.from({ length: 6 }, () => Array(7).fill(cellType.N)));
  const [Turn, setTurn] = useState(cellType.R);

  useEffect(() => {
      const rawhistory = localStorage.getItem("History");
      const history: string[] = [];
      try {
          if (rawhistory) {
              const parsed = JSON.parse(rawhistory);
              if (Array.isArray(parsed)) {
                  history.push(...parsed);
              }
          }
      } catch (error) {
          console.error("Error parsing History from localStorage:", error);
      }
      const filtered = history.filter((item, index) => item !== "Connect Four");
      const newHistory = [ "Connect Four", ...filtered].slice(0, 6); 
      localStorage.setItem("History", JSON.stringify([...newHistory]));
  },[]);

  function handleClick(col: number) {
    let row = 5;
    let isput = true;
    while (board[row][col] !== cellType.N) {
      if (row !== 0) {
        row -= 1;
      } else {
        isput = false;
        break;
      }
    }
    if (isput) {
      const newBoard = board.map((ro) => [...ro]);
      newBoard[row][col] = Turn;
      setboard(newBoard);
      if (scan(col, row, newBoard)) {
        Turn === cellType.R ? alert("Red Win!!") : alert("Brue Win!!");
      }
      Turn === cellType.R ? setTurn(cellType.B) : setTurn(cellType.R);
    }
  }

  function scan(x: number, y: number, board: string[][]): boolean {
    const dx = [1, 0, -1, -1, -1, 0, 1, 1]; const dy = [1, 1, 1, 0, -1, -1, -1, 0]; let colNum = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) {
      let count = 0;
      let sx = x, sy = y;
      while (true) {
        sx += dx[i]; sy += dy[i];

        if (0 <= sx && sx < 7 && 0 <= sy && sy < 6) {
          if (board[sy][sx] !== Turn) {
            break;
          }
          count++;
        } else { break; }
      }
      colNum[i] = count;
    }

    if (colNum[0] + colNum[4] >= 3 || colNum[1] + colNum[5] >= 3 || colNum[2] + colNum[6] >= 3 || colNum[3] + colNum[7] >= 3) return true;
    return false;
  }

  return (
    <main className="flex flex-col items-center min-h-screen py-2 gap-8">
      <h1>Connect Four</h1>
      <div className="grid grid-cols-7 w-fit bg-slate-900 object-center">
        {board.map((row, rowindex) => (
          row.map((cell: string, cellindex: number) => (
            <button key={`${rowindex}-${cellindex}`} className="border border-gray-500 size-12" onClick={() => handleClick(cellindex)}>
              {cell === cellType.R && <Image className="m-auto" src={red} alt="" width={40} height={40} priority />}
              {cell === cellType.B && <Image className="m-auto" src={blue} alt="" width={40} height={40} priority />}
            </button>
          ))
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => {
          setboard(Array.from({ length: 6 }, () => Array(7).fill(cellType.N)));
          setTurn(cellType.R);
        }} className="p-2 text-white bg-red-600 rounded-md hover:bg-red-700">
          Reset Game
        </button>
        <Link href="/" className="px-2 py-3 text-white bg-slate-600 rounded-md hover:bg-slate-700">
          Back to home
        </Link>
      </div>
    </main>
  )
}