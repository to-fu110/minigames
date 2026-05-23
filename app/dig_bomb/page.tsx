/*"use client"

import Link from "next/link"
import Image from "next/image"
import { useState , useRef} from "react"
import next from "next";

type cell = { isBomb: boolean, isOpen: boolean, bombNum: number };

export default function DigBomb() {

    const [board, setboard] = useState<cell[][]>(Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ({ isBomb: false, isOpen: false, bombNum: 0 }))));
    const boardref = useRef(board);
    const [isFirstClick, setIsFirstClick] = useState(true);

    function handleClick(x: number, y: number, newboard: cell[][] = boardref.current) {
        if (isFirstClick){
            generateBombs(x, y);
            setIsFirstClick(false);
            for(let i =0;i<8;i++) for(let j=0;j<8;j++) countBombs(j, i);
        }
        newboard[y][x] = { ...newboard[y][x], isOpen: true }; 
        boardref.current = newboard;

        if(boardref.current[y][x].bombNum === 0) {
            const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
            const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
            for (let i = 0; i < 8; i++) {
                const newX = dx[i] + x;
                const newY = dy[i] + y;
                if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && !boardref.current[newY][newX].isOpen) {
                    handleClick(newX, newY, newboard);
                }
            }
        }
        
    }

    function generateBombs(x:number, y:number, newboard: cell[][] = boardref.current) {
        let i=0;
        while (i < 10) {
            const bombx = Math.floor(Math.random() *8);
            const bomby = Math.floor(Math.random() *8);
            if (!newboard[bomby][bombx].isBomb && !((bombx -x >= -1 && bombx -x <= 1) && (bomby -y >= -1 && bomby -y <= 1))) {
                newboard[bomby][bombx].isBomb = true;
                boardref.current = newboard;
                i++;
            }
        }
        
    }

    function countBombs(x:number, y:number, newboard: cell[][] = boardref.current) {
        const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
        const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
        let count = 0;

        for (let i = 0; i < 8; i++) {
            const newX = dx[i] + x;
            const newY = dy[i] + y;
            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                if (newboard[newY][newX].isBomb) {
                    count++;
                }
            }
        }
        newboard[y][x].bombNum = count;
        boardref.current = newboard;
    }

    return (
        <main>
        <h1>Dig Bomb</h1>
        <div className="grid grid-cols-8 w-fit bg-slate-900">
            {board.map((row, rowindex) => (
            row.map((cell: cell, cellindex: number) => (
                <button key={`${rowindex}-${cellindex}`} className="w-8 h-8 border-2 border-gray-500" 
                onClick={() => {handleClick(cellindex, rowindex);
                            setboard([...boardref.current]);}}>
                {cell.isOpen ? (cell.isBomb ? '💣' : cell.bombNum) : ' '}
                </button>
            ))
            ))}
        </div>
        <Link href="/">Back to home</Link>
        </main>
    )
}*/

"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"

type cell = { isBomb: boolean, isOpen: boolean, isFrag: boolean, bombNum: number };

export default function DigBomb() {
    // 8x8の盤面初期化。各セルを個別のオブジェクトとして生成
    const [board, setboard] = useState<cell[][]>(
        Array.from({ length: 8 }, () =>
            Array.from({ length: 8 }, () => ({ isBomb: false, isOpen: false, isFrag: false, bombNum: 0 }))
        )
    );
    // 再帰処理中に最新の盤面を参照するためのRef
    const boardref = useRef(board);
    const [isFirstClick, setIsFirstClick] = useState(true);

    // 盤面をディープコピーするヘルパー
    const cloneBoard = (b: cell[][]) => b.map(row => row.map(c => ({ ...c })));

    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>, x: number, y: number) => {
        e.preventDefault();
        if (boardref.current[y][x].isOpen) return;
        boardref.current[y][x].isFrag = !boardref.current[y][x].isFrag;
        setboard([...boardref.current]);
    }

    function handleClick(x: number, y: number) {
        // すでに開いている場合は何もしない
        if (boardref.current[y][x].isOpen) return;

        // 最新の盤面をコピーして編集開始
        let currentBoard = cloneBoard(boardref.current);

        // 初回クリック時の処理：爆弾配置と全マスの数字計算
        if (isFirstClick) {
            currentBoard = generateAll(x, y, currentBoard);
            setIsFirstClick(false);
        }

        // 再帰的にマスを開く内部関数
        const floodFill = (cx: number, cy: number) => {
            if (cx < 0 || cx >= 8 || cy < 0 || cy >= 8 || currentBoard[cy][cx].isOpen) return;

            // マスを開く
            currentBoard[cy][cx].isOpen = true;

            // 爆弾を踏んだら終了
            if (currentBoard[cy][cx].isBomb) return;

            // 周囲の爆弾が0なら連鎖オープン
            if (currentBoard[cy][cx].bombNum === 0) {
                const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
                const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
                for (let i = 0; i < 8; i++) {
                    floodFill(cx + dx[i], cy + dy[i]);
                }
            }
        };

        floodFill(x, y);

        // RefとStateを更新
        boardref.current = currentBoard;
        setboard(currentBoard);

        // ゲームオーバー判定
        if (currentBoard[y][x].isBomb) {
            alert("Game Over! 💣");
            // 全ての爆弾を表示させる処理などをここに追加可能
        }
    }

    // 爆弾設置と周囲の爆弾数カウントを一括で行う
    function generateAll(startX: number, startY: number, b: cell[][]) {
        let placed = 0;
        while (placed < 10) {
            const bx = Math.floor(Math.random() * 8);
            const by = Math.floor(Math.random() * 8);
            // 最初の下図周囲3x3には置かない
            if (!b[by][bx].isBomb && (Math.abs(bx - startX) > 1 || Math.abs(by - startY) > 1)) {
                b[by][bx].isBomb = true;
                placed++;
            }
        }

        // 全マスの数字をカウント
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (b[r][c].isBomb) continue;
                let count = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const nr = r + dy, nc = c + dx;
                        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && b[nr][nc].isBomb) count++;
                    }
                }
                b[r][c].bombNum = count;
            }
        }
        return b;
    }

    return (
        <main className="p-8 flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Dig Bomb</h1>

            <div className="grid grid-cols-8 bg-slate-900 border-2 border-slate-700">
                {board.map((row, rowindex) => (
                    row.map((cell, cellindex) => (
                        <button
                            key={`${rowindex}-${cellindex}`}
                            className={`w-10 h-10 border border-slate-700 flex items-center justify-center font-bold text-white
                                ${cell.isOpen ? 'bg-slate-800' : 'bg-slate-600 hover:bg-slate-500'}`}
                            onClick={() => handleClick(cellindex, rowindex)}
                            onContextMenu={(e) => handleContextMenu(e, cellindex, rowindex)}
                        >
                            {cell.isOpen ? (
                                cell.isBomb ? (
                                    <Image src={`minigames/public/dig_bomb/bomb.svg`} alt="Bomb" width={20} height={20} />
                                ) : (
                                    cell.bombNum || ''
                                )
                            ) : (
                                cell.isFrag ? '🚩' : ' ')}
                        </button>
                    ))
                ))}
            </div>

            <div className="mt-4 flex gap-4">
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Reset Game
                </button>
                <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                    Back to Home
                </Link>
            </div>
        </main>
    )
}

