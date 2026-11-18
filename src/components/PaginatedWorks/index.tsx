import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import CardList from "@/components/CardList";
import { getWorksPage, worksPageSize } from "@/lib/microcms";
import styles from "./styles.module.css";

interface PaginatedWorksProps {
  heading: ReactNode;
  pathname: string;
  requestedPage?: string | string[];
  eventId?: string;
  eventTitle?: string;
  draftKey?: string;
}

export default async function PaginatedWorks({
  heading,
  pathname,
  requestedPage,
  eventId,
  eventTitle,
  draftKey,
}: PaginatedWorksProps) {
  const pageHref = (page: number) => {
    const query = new URLSearchParams({ page: String(page) });
    if (draftKey) query.set("draftKey", draftKey);
    return `${pathname}?${query}#works-list`;
  };

  if (
    requestedPage !== undefined &&
    (typeof requestedPage !== "string" || !/^[1-9][0-9]*$/.test(requestedPage))
  ) {
    redirect(pageHref(1));
  }

  const currentPage = Number(requestedPage ?? 1);
  const data = await getWorksPage(currentPage, eventId).catch((error) => {
    console.error("作品一覧の取得に失敗しました。", error);
    return null;
  });
  const totalPages = data ? Math.ceil(data.totalCount / worksPageSize) : 0;
  const lastPage = Math.max(1, totalPages);

  if (data && currentPage > lastPage) {
    redirect(pageHref(lastPage));
  }

  return (
    <section id="works-list" className={styles.section}>
      {heading}
      {data === null ? (
        <p className={styles.message}>
          作品一覧を取得できませんでした。時間をおいて再読み込みしてください。
        </p>
      ) : data.contents.length === 0 ? (
        <p className={styles.message}>掲載されている作品はありません。</p>
      ) : (
        <CardList
          contents={data.contents}
          isEvent={false}
          eventId={eventId}
          eventTitle={eventTitle}
        />
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageHref={pageHref}
        />
      )}
    </section>
  );
}

function Pagination({
  currentPage,
  totalPages,
  pageHref,
}: {
  currentPage: number;
  totalPages: number;
  pageHref: (page: number) => string;
}) {
  const start = Math.max(2, Math.min(currentPage - 1, totalPages - 3));
  const end = Math.min(totalPages - 1, start + 2);
  const pages = [
    1,
    ...Array.from({ length: end - start + 1 }, (_, i) => start + i),
    totalPages,
  ];

  return (
    <nav className={styles.pagination} aria-label="作品一覧のページ送り">
      {currentPage === 1 ? (
        <button type="button" disabled>
          前へ
        </button>
      ) : (
        <Link href={pageHref(currentPage - 1)} prefetch={false}>
          前へ
        </Link>
      )}
      {pages.map((page, index) => (
        <span className={styles.pageGroup} key={page}>
          {index > 0 && page - pages[index - 1] > 1 && (
            <span aria-hidden="true">…</span>
          )}
          {page === currentPage ? (
            <span className={styles.current} aria-current="page">
              {page}
            </span>
          ) : (
            <Link
              href={pageHref(page)}
              prefetch={false}
              aria-label={`${page}ページ目`}
            >
              {page}
            </Link>
          )}
        </span>
      ))}
      {currentPage === totalPages ? (
        <button type="button" disabled>
          次へ
        </button>
      ) : (
        <Link href={pageHref(currentPage + 1)} prefetch={false}>
          次へ
        </Link>
      )}
    </nav>
  );
}
