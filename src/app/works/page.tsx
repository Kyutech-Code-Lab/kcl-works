import PaginatedWorks from "@/components/PaginatedWorks";
import PageTitle from "@/components/ui/PageTitle";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { page } = await searchParams;
  return (
    <div className={styles.container}>
      <PaginatedWorks
        heading={<PageTitle title="Works" />}
        pathname="/works"
        requestedPage={page}
      />
    </div>
  );
}
