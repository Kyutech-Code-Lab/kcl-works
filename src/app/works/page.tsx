import CardList from "@/components/CardList";
import PageTitle from "@/components/ui/PageTitle";
import { getWorks } from "@/lib/microcms";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function WorksPage() {
  const data = await getWorks();
  return (
    <div className={styles.container}>
      <PageTitle title="Works" />
      <CardList contents={data.contents} isEvent={false} />
    </div>
  );
}
