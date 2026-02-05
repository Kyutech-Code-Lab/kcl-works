import Breadcrumbs from "@/components/Breadcrumbs";
import CardList from "@/components/CardList";
import PageTitle from "@/components/ui/PageTitle";
import { getProducts } from "@/lib/microcms";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function ProductsPage() {
  const data = await getProducts();
  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Works" }]} />
      <PageTitle title="Works" />
      <CardList contents={data.contents} isEvent={false} />
    </div>
  );
}
