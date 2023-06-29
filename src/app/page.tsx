import Image from 'next/image'
import styles from './page.module.scss'

// components:
import Navbar from '../components/navbar/navbar';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
        <h1>MAIN PAGE</h1>
    </main>
  )
}
