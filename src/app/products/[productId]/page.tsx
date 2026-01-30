import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/ui/Hero";
import MarkdownContent from "@/components/ui/MarkdownContent";
import Paper from "@/components/ui/Paper";
import Tag from "@/components/ui/Tag";
import { getAllProductIds, getProduct } from "@/lib/microcms";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type ProductDetailsPageProps = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ eventId?: string; eventTitle?: string }>;
};

export const revalidate = 60; // ページデータの再検証間隔

export async function generateStaticParams() {
  const allProductIds = await getAllProductIds(); // getAllProductIdsを使用
  return allProductIds.map((content) => ({
    productId: content.id,
  }));
}

export default async function ProductDetailsPage(
  props: ProductDetailsPageProps,
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const productData = await getProduct(params.productId); // getProductでデータ取得
  if (!productData) {
    notFound();
  }

  // パンくずリストの生成
  const breadcrumbItems = [{ label: "Home", href: "/" }];
  if (searchParams.eventId && searchParams.eventTitle) {
    breadcrumbItems.push({ label: "Events", href: "/events" });
    breadcrumbItems.push({
      label: searchParams.eventTitle,
      href: `/events/${searchParams.eventId}`,
    });
  }
  breadcrumbItems.push({ label: productData.title, href: "" });

  return (
    <div className={styles.container}>
      <Hero
        title={productData.title}
        imageUrl={productData.thumbnail?.url || "/dummy.jpg"} // サムネイル画像
      />
      <Breadcrumbs items={breadcrumbItems} />
      <div className={styles.content}>
        <div className={styles["tag-section"]}>
          {productData.tags && productData.tags.length > 0 && (
            <Paper>
              <div className={styles.tags}>
                {productData.tags.map((tag) => (
                  <Tag key={tag.id} type="genre">
                    {tag.name}
                  </Tag>
                ))}
              </div>
            </Paper>
          )}
          {productData.creators && (
            <Paper>
              <div className={styles.tags}>
                {productData.creators
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
        <Paper>
          <MarkdownContent content={productData.description} />
        </Paper>
        <div className={styles.links}>
          {productData.github_url && (
            <Paper>
              GitHub
              <Link
                href={productData.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {productData.github_url}
              </Link>
            </Paper>
          )}
          {productData.site_url && (
            <Paper>
              Site
              <Link
                href={productData.site_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {productData.site_url}
              </Link>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
}
