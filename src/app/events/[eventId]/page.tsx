import CardList from "@/components/CardList";
import {
  getAllEventIds,
  getEvent,
  getProducts,
} from "@/lib/microcms";
import Paper from "@/components/ui/Paper";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

// Propsの型を更新: params自体がPromiseであると仮定
type EventDetailsPageProps = {
  params: Promise<{ eventId: string }>;
};

export const revalidate = 60;

// 静的パスを生成
export async function generateStaticParams() {
  // getAllEventIdsを使用して全てのイベントIDを取得
  const allEventIds = await getAllEventIds();
  return allEventIds.map((content) => ({
    eventId: content.id,
  }));
}

// propsを直接受け取り、paramsをawaitで解決する
export default async function EventDetailsPage(props: EventDetailsPageProps) {
  // paramsオブジェクト自体をawaitで解決
  const params = await props.params;

  const eventData = await getEvent(params.eventId);

  // データがなければ404
  if (!eventData) {
    notFound();
  }

  // 関連商品をいくつか取得
  const productData = await getProducts({ limit: 4 });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{eventData.title}</h1>

      <div className={styles.content}>
        <Paper>{eventData.description}</Paper>
      </div>

      <h2>関連商品</h2>
      <CardList contents={productData.contents} isEvent={false} />
    </div>
  );
}
