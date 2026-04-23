"use client"

import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Welcome to My App</h1>
      <Link href="/othello">Go to Othello</Link>
      <Link href="/connect_four">Go to Connect Four</Link>
    </main>
  )
}