"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Accordion from './compornents/accordion'



const getcolorStyles = (color: string) => ({
  pink: {
    text: "text-pink-500",
    border: "border-pink-500",
    bg: "bg-[linear-gradient(to_right,#ff00ff30_2px,transparent_1px),linear-gradient(to_bottom,#ff00ff30_2px,transparent_1px)]",
    shadow: "shadow-pink-500/20"
  },

  green: {
    text: "text-emerald-500",
    border: "border-emerald-500",
    bg: "bg-[linear-gradient(to_right,#10b98130_2px,transparent_1px),linear-gradient(to_bottom,#10b98130_2px,transparent_1px)]",
    shadow: "shadow-emerald-500/20"
  },

  blue: {
    text: "text-blue-500",
    border: "border-blue-500",
    bg: "bg-[linear-gradient(to_right,#3b82f630_2px,transparent_1px),linear-gradient(to_bottom,#3b82f630_2px,transparent_1px)]",
    shadow: "shadow-blue-500/20"
  },

}[color] || { text: "text-pink-500", border: "border-pink-500", bg: "bg-[linear-gradient(to_right,#ff00ff30_2px,transparent_1px),linear-gradient(to_bottom,#ff00ff30_2px,transparent_1px)]" });

const Sidebar = ({ color, setColor }: { color: string, setColor: (color: string) => void }) => {
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    const rawhistory = localStorage.getItem("History");
    try {
      const parsed = rawhistory ? JSON.parse(rawhistory) : [];
      if(parsed){
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (error) {
      console.error("Error parsing History from localStorage:", error);
    }
  }, []);

  return (
    <div className="w-64 p-4 mr-8 backdrop-blur-md bg-slate-500/10 ">
      <h2 className={`text-xl font-black tracking-widest mb-4 ${getcolorStyles(color).text}`}>Sidebar</h2>
      <Accordion title="履歴" colorStyle={getcolorStyles(color).text}>
        <ul className="p-4 text-gray-300">
          {history.length === 0 ? (
            <li>履歴がありません</li>
          ) : (
            history.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))
          )}
        </ul>
      </Accordion>
      <Accordion title="設定" colorStyle={getcolorStyles(color).text}>
        <div className="p-4 text-gray-300">
          {["pink", "green", "blue"].map((c) => (
            <label key={c}>
              <input type="radio" name="color" checked={color === c} value={c} onChange={() => { setColor(c); localStorage.setItem('color', c); }} className="w-0 h-0 peer" />
              <div className={` mr-2 mb-2 px-3 py-1 rounded bg-white/10 ${getcolorStyles(c).text} cursor-pointer peer-checked:bg-white/17 peer-checked:${getcolorStyles(c).text} peer-checked:shadow-lg peer-checked:${getcolorStyles(c).shadow}`}>
                {c}
              </div>
            </label>
          ))}
        </div>
      </Accordion>
      <Accordion title="実績" colorStyle={getcolorStyles(color).text}>
        <p>オセロで勝利する</p>
      </Accordion>
    </div>
  )
}

function GameArticles({ gamename, href, setumei, color }: { gamename: string, href: string, setumei: string, color: string }) {
  return (
    <Link href={href} className={`border-2 border-gray-500 rounded-md bg-slate-900 font-black ${getcolorStyles(color).text} px-4 py-6 m-4  
          hover:translate-y-1 hover:shadow-lg hover:bg-slate-800 hover:${getcolorStyles(color).shadow}
          `}>
      <h2>{gamename}</h2>
      <p>{setumei}</p>
      Go to {gamename}
    </Link>
  )

}


export default function Home() {

  const [color, setColor] = useState( () => {
    if(typeof window !== "undefined"){
      return localStorage.getItem('color') || 'pink';
    }
    return 'pink';
  });

  const GameList = [
    { gamename: "Connect Four", href: "/connect_four", setumei: "コインを落として４つ並べるゲーム。数手先を読む思考力を問われます。" },
    { gamename: "Othello", href: "/othello", setumei: "いわずと知れた名作ゲーム。実物がないときにどうぞ。" },
    { gamename: "Dig bomb", href: "/dig_bomb", setumei: "いわゆるマインスイーパー。時間をつぶすにはうってつけです。" }
  ]

  return (
    <main className={`min-h-screen bg-slate-950 ${getcolorStyles(color).bg} bg-[size:40px_40px]`}>
      <div className="flex h-full">
        <Sidebar color={color} setColor={setColor} />
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-5">
          {GameList.map((game, index) => (
            <GameArticles
              key={index}
              gamename={game.gamename}
              href={game.href}
              setumei={game.setumei}
              color={color}
            />
          ))}
        </div>
      </div>

    </main>
  )
}