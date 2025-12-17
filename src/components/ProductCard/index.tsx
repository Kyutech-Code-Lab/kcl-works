import styles from "./styles.module.css";
import Image from "next/image";
import { Card } from "@/components/ui/Card";

interface ProductCardProps {
  title: string;
  thumbnailUrl: string;
  tags: string[];
}

const ProductCard = ({ title, thumbnailUrl, tags }: ProductCardProps) => {
  return (
    <Card>
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
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
