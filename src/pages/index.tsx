import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <>
      <div className={styles.homeWrapper}>
        <p className={styles.description}>퀴즈 홈페이지</p>
        <p className={styles.description}>반갑습니다</p>
        <Link href="/quiz" className={styles.startBtn}>
         퀴즈 시작하기
        </Link>
      </div>
    </>
  );
}
