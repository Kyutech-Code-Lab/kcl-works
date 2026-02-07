import Breadcrumbs from "@/components/Breadcrumbs";
import CardList from "@/components/CardList";
import MarkdownContent from "@/components/ui/MarkdownContent";
import PageTitle from "@/components/ui/PageTitle";
import Paper from "@/components/ui/Paper";
import { getAllEventIds, getEvent, getWorks } from "@/lib/microcms";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type EventDetailsPageProps = {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ draftKey?: string }>;
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
  const searchParams = await props.searchParams;

  const draftKey =
    typeof searchParams.draftKey === "string"
      ? searchParams.draftKey
      : undefined;

  if (draftKey) {
    noStore();
  }

  let eventData: Awaited<ReturnType<typeof getEvent>> | undefined;

  try {
    eventData = await getEvent(
      params.eventId,
      draftKey ? { draftKey } : undefined,
    );
  } catch {
    if (draftKey) {
      return (
        <div className={styles["not-draft-key"]}>
          ドラフトキーが無効です。正しいキーを使用してください。
        </div>
      );
    }
    notFound();
  }

  // データがなければ404
  if (!eventData) {
    if (draftKey) {
      return (
        <div className={styles["not-draft-key"]}>
          ドラフトキーが無効です。正しいキーを使用してください。
        </div>
      );
    }
    notFound();
  }

  const workData = await getWorks({
    filters: `event[contains]${params.eventId}`,
  });

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          { label: "Events", href: "/events" },
          { label: eventData.title },
        ]}
      />
      {draftKey && <div>これは下書きです。</div>}
      <PageTitle title={eventData.title} />

      <div className={styles.contents}>
        <Paper>
          <MarkdownContent content={eventData.description} />
        </Paper>
      </div>
      <CardList
        contents={workData.contents}
        isEvent={false}
        eventId={params.eventId}
        eventTitle={eventData.title}
      />
    </div>
  );
}
