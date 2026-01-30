import styles from "./page.module.css";
import PageTitle from "@/components/ui/PageTitle";
import CardList from "@/components/CardList";
import { getEvents } from "@/lib/microcms";

export const revalidate = 60;

export default async function EventsPage() {
  const data = await getEvents();
  return (
    <div className={styles.container}>
      <PageTitle title="Events" />
      <CardList contents={data.contents} isEvent={true} />
    </div>
  );
}
