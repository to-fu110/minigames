"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [color, setColor] = useState("pink");

  const colorStyles = {
    pink: { text: "text-pink-500", border: "border-pink-500", bg: "bg-pink-500", shadow: "shadow-pink-500/20" },
    green: { text: "text-emerald-500", border: "border-emerald-500", bg: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
    blue: { text: "text-blue-500", border: "border-blue-500", bg: "bg-blue-500", shadow: "shadow-blue-500/20" },
  }[color] || { text: "text-pink-500", border: "border-pink-500", bg: "bg-pink-500" };

  function GameArticles({gamename, href, setumei} : {gamename: string, href: string, setumei: string}) {
    return (
      <Link href={href} className={`border-2 border-gray-500 rounded-md bg-slate-900 font-black ${colorStyles.text} px-4 py-6 m-4  hover:translate-y-1 shadow-lg hover:bg-slate-800 hover:${colorStyles.shadow}`}>
          <h2>{gamename}</h2>
          <p>{setumei}</p>
          Go to {gamename}
      </Link>
    )

  }

  const Sidebar = () => {
    return (
      <div className="w-64 p-4 mr-8 backdrop-blur-md bg-slate-500/10 ">
        <h2 className={`text-xl font-black tracking-widest mb-4 ${colorStyles.text}`}>Sidebar</h2>
        <details>
          <summary className={`text-2xl font-bold ${colorStyles.text} bg-slate-800 px-4 my-2`}>履歴</summary>
          <ul className="p-4 text-gray-300">
            <li>aaa</li>
            <li>sss</li>
            <li>ddd</li>
            <li>fff</li>
            <li>ggg</li>
            <li>hhh</li>
          </ul>
        </details>
        <details>
          <summary className={`text-2xl font-bold ${colorStyles.text} bg-slate-800 px-4 my-2`}>設定</summary>
          <div className="p-4 text-gray-300">
            {["pink", "green", "blue"].map((c) => (
              <label key={c}>
                <input type="radio" name="color" defaultChecked={color === c} value={c} onClick={() => setColor(c)} className="w-0 h-0 peer"/>
                <div className={` mr-2 mb-2 px-3 py-1 rounded bg-white/10 ${c === "pink" ? "text-pink-500" : c === "green" ? "text-emerald-500" : "text-blue-500"} cursor-pointer peer-checked:bg-white/17 peer-checked:${c === "pink" ? "text-pink-500" : c === "green" ? "text-emerald-500" : "text-blue-500"} peer-checked:shadow-lg peer-checked:${c === "pink" ? "shadow-pink-500/20" : c === "green" ? "shadow-emerald-500/20" : "shadow-blue-500/20"}`}>
                  {c}
                </div>
              </label>
            ))}
          </div>
        </details>
        <details>
          <summary className={`text-2xl font-bold ${colorStyles.text} bg-slate-800 px-4 my-2`}>実績</summary>
          <p>オセロで勝利する</p>
        </details>

      </div>
    )
  }

  const GameList = [
    {gamename: "Connect Four", href: "/connect_four", setumei: "コインを落として４つ並べるゲーム。数手先を読む思考力を問われます。"},
    {gamename: "Othello", href: "/othello", setumei: "いわずと知れた名作ゲーム。実物がないときにどうぞ。"},
    {gamename: "Dig bomb", href: "/dig_bomb", setumei: "いわゆるマインスイーパー。時間をつぶすにはうってつけです。"}
  ]

  return (
    <main className="min-h-screen bg-slate-950 bg-[linear-gradient(to_right,#ff00ff30_2px,transparent_1px),linear-gradient(to_bottom,#ff00ff30_2px,transparent_1px)] bg-[size:40px_40px]">
      <div className="flex h-full">
        <Sidebar />
        <div className="grid grid-cols-2 grid-rows-5">
          {GameList.map((game, index) => (
            <GameArticles
              key={index}
              gamename={game.gamename}
              href={game.href}
              setumei={game.setumei}
            />
          ))}
        </div>
      </div>
      
    </main>
  )
}