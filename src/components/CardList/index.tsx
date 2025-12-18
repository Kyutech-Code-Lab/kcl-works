import styles from "./styles.module.css";
import EventCard from "@/components/EventCard";
import ProductCard from "@/components/ProductCard";

interface CardListProps {
  contents: any[];
  isEvent: boolean;
}

const CardList = ({ contents, isEvent }: CardListProps) => {
  return (
    <ul className={styles["card-list"]}>
      {contents.map((content) =>
        isEvent ? (
          <li key={content.title}>
            <EventCard
              title={content.title}
              date={content.date}
              thumbnailUrl={content.thumbnailUrl}
            />
          </li>
        ) : (
          <li key={content.title}>
            <ProductCard
              title={content.title}
              thumbnailUrl={content.thumbnailUrl}
              tags={content.tags}
            />
          </li>
        )
      )}
    </ul>
  );
};

export default CardList;
