import CardList from "@/components/CardList";
import { getAllEventIds, getEvent, getProducts } from "@/lib/microcms";
import Paper from "@/components/ui/Paper";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import PageTitle from "@/components/ui/PageTitle";

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

  const productData = await getProducts();

  return (
    <div className={styles.container}>
      <PageTitle title={eventData.title} />

      <div className={styles.contents}>
        <Paper>{eventData.description}</Paper>
        <CardList contents={productData.contents} isEvent={false} />
      </div>
    </div>
  );
}
