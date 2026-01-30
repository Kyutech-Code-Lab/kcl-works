import CardList from "@/components/CardList";
import PageTitle from "@/components/ui/PageTitle";
import Paper from "@/components/ui/Paper";
import { getAllEventIds, getEvent, getProducts } from "@/lib/microcms";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parser } from "rich-editor-to-markdown-parser";
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

  const productData = await getProducts();

  return (
    <div className={styles.container}>
      <PageTitle title={eventData.title} />

      <div className={styles.contents}>
        <Paper>
          <ReactMarkDown remarkPlugins={[remarkGfm]}>
            {parser(eventData.description)}
          </ReactMarkDown>
        </Paper>
        <CardList contents={productData.contents} isEvent={false} />
      </div>
    </div>
  );
}
