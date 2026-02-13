import React from "react";
import Link from "next/link";
import PageTitle from "@/components/ui/PageTitle";
import styles from "./page.module.css";
import Paper from "@/components/ui/Paper";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>KCL Works</h1>

      <p className={styles.lead}>
        KCL Works は、KCL（Kyutech Code
        Lab）に参加する九州工業大学の学生による作品と活動成果を紹介するポートフォリオサイトです。
        <br />
        ハッカソン、企業連携イベント、開発プロジェクトなど、学生の挑戦の記録を掲載しています。
        <br />
        <Link
          href="https://www.kyutech.ac.jp/career/kcl.html"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          KCLについてはこちらをご覧ください
        </Link>
      </p>
      <p></p>

      <div className={styles.grid}>
        <Paper>
          <h3 className={styles["card-title"]}>Events</h3>
          <p className={styles["card-body"]}>
            KCLで行われたハッカソンや企業連携イベントを紹介します。
          </p>
          <Link href="/events" className={styles.button}>
            イベントを見る
          </Link>
        </Paper>

        <Paper>
          <h3 className={styles["card-title"]}>Works</h3>
          <p className={styles["card-body"]}>
            学生が制作したアプリやプロダクトを掲載しています。
          </p>
          <Link href="/works" className={styles.button}>
            作品を見る
          </Link>
        </Paper>
      </div>
    </div>
  );
}
