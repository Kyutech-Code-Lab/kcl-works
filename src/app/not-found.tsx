import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - ページが見つかりません</h1>
      <p className={styles.message}>
        申し訳ございません。お探しのページは存在しません。
      </p>
      <Link href="/" className={styles.homeLink}>
        ホームに戻る
      </Link>
    </div>
  );
}
