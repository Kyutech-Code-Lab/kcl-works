import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaginatedWorks from "@/components/PaginatedWorks";
import MarkdownContent from "@/components/ui/MarkdownContent";
import PageTitle from "@/components/ui/PageTitle";
import Paper from "@/components/ui/Paper";
import { getEvent } from "@/lib/microcms";
import styles from "./page.module.css";

type EventDetailsPageProps = {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ draftKey?: string; page?: string | string[] }>;
};

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
      <PaginatedWorks
        heading={<h2 className={styles.worksHeading}>作品一覧</h2>}
        pathname={`/events/${encodeURIComponent(params.eventId)}`}
        requestedPage={searchParams.page}
        eventId={params.eventId}
        eventTitle={eventData.title}
        draftKey={draftKey}
      />
    </div>
  );
}
