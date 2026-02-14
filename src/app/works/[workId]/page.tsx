import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/ui/Hero";
import MarkdownContent from "@/components/ui/MarkdownContent";
import Paper from "@/components/ui/Paper";
import Tag from "@/components/ui/Tag";
import { getWork } from "@/lib/microcms";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import awardFormatter from "@/lib/awardsFormatter";

interface WorkDetailsParams {
  workId: string;
}

interface WorkDetailsSearchParams {
  eventId?: string;
  eventTitle?: string;
  draftKey?: string;
}

interface WorkDetailsPageProps {
  params: Promise<WorkDetailsParams>;
  searchParams: Promise<WorkDetailsSearchParams>;
}

export default async function WorkDetailsPage(props: WorkDetailsPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const draftKey =
    typeof searchParams.draftKey === "string"
      ? searchParams.draftKey
      : undefined;

  if (draftKey) {
    noStore();
  }

  let workData: Awaited<ReturnType<typeof getWork>> | undefined;

  try {
    workData = await getWork(
      params.workId,
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

  if (!workData) {
    if (draftKey) {
      return (
        <div className={styles.container}>
          ドラフトキーが無効です。正しいキーを使用してください。
        </div>
      );
    }
    notFound();
  }

  // パンくずリストの生成
  const breadcrumbItems = [] as { label: string; href?: string }[];
  if (searchParams.eventId && searchParams.eventTitle) {
    breadcrumbItems.push({ label: "Events", href: "/events" });
    breadcrumbItems.push({
      label: searchParams.eventTitle,
      href: `/events/${searchParams.eventId}`,
    });
  } else {
    breadcrumbItems.push({ label: "Works", href: "/works" });
  }
  breadcrumbItems.push({ label: workData.title });

  return (
    <div className={styles.container}>
      <Hero
        title={workData.title}
        imageUrl={workData.thumbnail?.url || "/dummy.jpg"} // サムネイル画像
      />
      <Breadcrumbs items={breadcrumbItems} />
      {draftKey && <div>これは下書きです。</div>}
      <div className={styles.content}>
        <div className={styles["tag-section"]}>
          {workData.tags && workData.tags.length > 0 && (
            <Paper>
              <div className={styles.tags}>
                {workData.tags.map((tag) => (
                  <Tag key={tag.id} type="genre">
                    {tag.name}
                  </Tag>
                ))}
              </div>
            </Paper>
          )}
          {workData.creators && (
            <Paper>
              <div className={styles.tags}>
                {workData.creators
                  .split(/[\n、,\s]+/)
                  .filter((creator) => creator.trim())
                  .map((creator) => (
                    <Tag key={creator} type="creator">
                      {creator.trim()}
                    </Tag>
                  ))}
              </div>
            </Paper>
          )}
        </div>
        {workData.awards && workData.awards.length > 0 && (
          <Paper>
            <div className={styles["awards-row"]}>
              <p className={styles["awards-label"]}>受賞歴</p>
              <div className={styles.awards}>
                {awardFormatter(workData.awards)
                  .map((award) => `${award.eventTitle} - ${award.awardTitle}`)
                  .join("、")}
              </div>
            </div>
          </Paper>
        )}

        {workData.details && workData.details.length > 0 && (
          <div className={styles.details}>
            {workData.details.map((detail, index) => (
              <Paper key={`${detail.title?.[0] ?? "detail"}-${index}`}>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-title"]}>
                    {detail.title?.[0] ?? ""}
                  </span>
                  <p className={styles["detail-content"]}>{detail.content}</p>
                </div>
              </Paper>
            ))}
          </div>
        )}
        <Paper>
          <MarkdownContent content={workData.description} />
        </Paper>
        <div className={styles.links}>
          {workData.github_url && (
            <Paper>
              <span>GitHub</span>
              <Link
                href={workData.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {workData.github_url}
              </Link>
            </Paper>
          )}
          {workData.site_url && (
            <Paper>
              <span>Site</span>
              <Link
                href={workData.site_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {workData.site_url}
              </Link>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
}
