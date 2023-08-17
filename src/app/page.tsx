import Image from 'next/image'
import styles from './page.module.css'
import prisma from "@/prisma/prisma";

export default async function Home() {
  

  return (
    <main className={styles.main}>
      <h1>Trivia Game</h1>
    </main>
  )
}
