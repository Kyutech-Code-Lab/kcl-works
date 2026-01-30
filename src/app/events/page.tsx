import Breadcrumbs from "@/components/Breadcrumbs";
import CardList from "@/components/CardList";
import PageTitle from "@/components/ui/PageTitle";
import { getEvents } from "@/lib/microcms";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function EventsPage() {
  const data = await getEvents();
  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />
      <PageTitle title="Events" />
      <CardList contents={data.contents} isEvent={true} />
    </div>
  );
}
