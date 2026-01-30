import Card from "@/components/ui/Card";
import Image from "next/image";
import styles from "./styles.module.css";
import Tag from "@/components/ui/Tag";
import Link from "next/link";

interface ProductCardProps {
  id: string; // idを追加
  title: string;
  thumbnailUrl: string;
  tags: string[];
}

const ProductCard = ({ id, title, thumbnailUrl, tags }: ProductCardProps) => {
  return (
    <Card>
      <Link href={`/products/${id}`}>
        <div className={styles.thumbnail}>
          <Image
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            width={300}
            height={200}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.tags}>
            {tags?.map((tag) => (
              <Tag key={tag} type="genre">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
