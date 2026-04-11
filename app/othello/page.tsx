"use client"

import Link from 'next/link'
import Image from 'next/image'
import './othello.css'
import { useState } from 'react'

const cellType = {"N": "N", "B": "B", "W": "W"};

const startBoard = () => {
    const board = Array.from({ length: 8 }, () => Array(8).fill(cellType.N));
    board[3][3] = cellType.W;
    board[3][4] = cellType.B;
    board[4][3] = cellType.B;
    board[4][4] = cellType.W;
    return board;
}

export default function Othello() {
    const [board, setBoard] = useState(startBoard());
    const [turn, setTurn] = useState(cellType.B);

    function handleClick(rowIndex: number, cellIndex: number) {
        if (board[rowIndex][cellIndex] === cellType.N) {
            const newBoard = board.map((row) => [...row]);
            let canPut = false;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    if (Scan(rowIndex, cellIndex, dx, dy)) {
                        canPut = true;
                        let x = cellIndex + dx;
                        let y = rowIndex + dy;
                        while (board[y][x] !== turn) {
                            newBoard[y][x] = turn;
                            x += dx; y += dy;
                        }
                    }
                }
            }
            if (!canPut) return;
            newBoard[rowIndex][cellIndex] = turn;
            setBoard(newBoard);
            setTurn(turn === cellType.B ? cellType.W : cellType.B);
        }
    }

    function Scan(rowIndex: number, cellIndex: number, dx: number,dy: number): boolean {
        if  (rowIndex + dy >= 0 && rowIndex + dy < 8 && cellIndex + dx >= 0 && cellIndex + dx < 8) {
            if (board[rowIndex + dy][cellIndex + dx] !== turn && board[rowIndex + dy][cellIndex + dx] !== cellType.N) {
                while (rowIndex + dy >= 0 && rowIndex + dy < 8 && cellIndex + dx >= 0 && cellIndex + dx < 8) {
                    rowIndex += dy; cellIndex += dx;
                    if (board[rowIndex][cellIndex] === turn) {
                        return true;
                    }else if (board[rowIndex][cellIndex] === cellType.N) {
                        break;
                    }
                }
            }
        }
        return false;

    }
    return (
        <main>
            <h1>Othello</h1>
            <h2>Nextplayer: {turn === cellType.B ? "Black" : "White"}</h2> 
            <div className="board">
                {board.map((row, rowindex) => (
                    row.map((cell:string, cellindex:number) => (
                        <button className="border border-gray-300 size-12" onClick={() => handleClick(rowindex, cellindex)}>
                            {cell === cellType.B && <Image className="piece" src="/blackOthello.svg" alt="" width={40} height={40} loading='eager'/>}
                            {cell === cellType.W && <Image className="piece" src="/whiteOthello.svg" alt="" width={40} height={40} loading='eager'/>}
                        </button>
                    ))
                ))}
            </div>
            <button onClick={() => setTurn(turn === cellType.B ? cellType.W : cellType.B)} className="pass">
                Pass
            </button>
            <br />
            <Link href="/">Go back to Home</Link>
        </main>
    )
}