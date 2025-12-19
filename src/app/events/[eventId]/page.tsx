import styles from "./page.module.css";
import Hero from "@/components/ui/Hero";
import Paper from "@/components/ui/Paper";
import CardList from "@/components/CardList";
import Card from "@/components/ui/Card";

const dummyProducts = [
  {
    title: "製品A",
    thumbnailUrl: "/dummy.jpg",
    tags: ["タグ1", "タグ2"],
  },
  {
    title: "製品B",
    thumbnailUrl: "/dummy.jpg",
    tags: ["タグ3", "タグ4"],
  },
  {
    title: "製品C",
    thumbnailUrl: "/dummy.jpg",
    tags: ["タグ5", "タグ6"],
  },
  { title: "製品D", thumbnailUrl: "/dummy.jpg", tags: ["タグ7", "タグ8"] },
  {
    title: "製品E",
    thumbnailUrl: "/dummy.jpg",
    tags: ["タグ9", "タグ10"],
  },
];

const EventDetailsPage = () => {
  return (
    <div className={styles.container}>
      <Hero title="村田制作所合同ハッカソン" imageUrl="/dummy.jpg" />
      <div className={styles.content}>
        <Paper>
          <h2>イベント詳細</h2>
          <p>
            このハッカソンは、村田制作所が主催する合同ハッカソンです。参加者は最新の技術を活用して、革新的なソリューションを開発します。初心者から経験豊富な開発者まで、幅広いレベルの参加者を歓迎します。
          </p>
          <h3>開催日時</h3>
          <p>2024年7月15日 10:00 AM - 2024年7月16日 6:00 PM</p>
          <h3>場所</h3>
          <p>東京都渋谷区〇〇ビル 5階 会議室</p>
          <h3>参加費</h3>
          <p>無料</p>
          <h3>申し込み方法</h3>
          <p>
            公式ウェブサイトからオンラインで申し込みが可能です。定員に達し次第、締め切らせていただきますので、お早めにご登録ください。
          </p>
        </Paper>
      </div>
      <CardList contents={dummyProducts} isEvent={false} />
    </div>
  );
};

export default EventDetailsPage;
