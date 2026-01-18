import styles from "./page.module.css";
import Hero from "@/components/ui/Hero";
import Paper from "@/components/ui/Paper";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getAllProductIds } from "@/components/lib/microcms";
import type { Product } from "@/components/lib/microcms";

type ProductDetailsPageProps = {
  params: Promise<{ productId: string }>;
};

export const revalidate = 60; // ページデータの再検証間隔

export async function generateStaticParams() {
  const allProductIds = await getAllProductIds(); // getAllProductIdsを使用
  return allProductIds.map((content) => ({
    productId: content.id,
  }));
}

export default async function ProductDetailsPage(props: ProductDetailsPageProps) {
  const params = await props.params;
  const productData = await getProduct(params.productId); // getProductでデータ取得
  if (!productData) {
    notFound();
  }
  return (
    <div className={styles.container}>
      <Hero
        title={productData.title}
        imageUrl={productData.thumbnail?.url || "/dummy.jpg"} // サムネイル画像
      />
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
                <Tag key={productData.creators} type="creator">
                  {productData.creators}
                </Tag>
              </div>
            </Paper>
          )}
        </div>
        <Paper>
          <div dangerouslySetInnerHTML={{ __html: productData.description || '' }} />
        </Paper>
        <div className={styles.links}>
          {productData.github_url && (
            <Paper>
              GitHub:{" "}
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
              Site:{" "}
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
