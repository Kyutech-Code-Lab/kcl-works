import styles from "./page.module.css";
import Hero from "@/components/ui/Hero";
import Paper from "@/components/ui/Paper";
import Tag from "@/components/ui/Tag";
import Link from "next/link";

const dummyProduct = {
  title: "Sample Product",
  thumbnailUrl: "/dummy.jpg",
  tags: ["New", "Featured", "Sale"],
  creators: ["Alice", "Bob"],
  description:
    "This is a sample product description. It provides details about the product.",
  site_url: "https://example.com",
  github_url: "https://github.com/example",
};

export default function ProductPage() {
  return (
    <div className={styles.container}>
      <Hero title={dummyProduct.title} imageUrl={dummyProduct.thumbnailUrl} />
      <div className={styles.content}>
        <div className={styles["tag-section"]}>
          <Paper>
            <div className={styles.tags}>
              {dummyProduct.tags.map((tag) => (
                <Tag key={tag} type="genre">
                  {tag}
                </Tag>
              ))}
            </div>
          </Paper>
          <Paper>
            <div className={styles.tags}>
              {dummyProduct.creators.map((creator) => (
                <Tag key={creator} type="creator">
                  {creator}
                </Tag>
              ))}
            </div>
          </Paper>
        </div>
        <Paper>
          <p>{dummyProduct.description}</p>
        </Paper>
        <Paper>
          <Link
            href={dummyProduct.github_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub {dummyProduct.github_url}
          </Link>
        </Paper>
        <Paper>
          <Link
            href={dummyProduct.site_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Site {dummyProduct.site_url}
          </Link>
        </Paper>
      </div>
    </div>
  );
}
