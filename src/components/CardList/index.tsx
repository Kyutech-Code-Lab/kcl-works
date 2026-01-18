import styles from "./styles.module.css";
import EventCard from "@/components/EventCard";
import ProductCard from "@/components/ProductCard";
import { Event, Product } from "@/components/lib/microcms";

interface CardListProps {
  contents: (Event | Product)[];
  isEvent: boolean;
}

const CardList = ({ contents, isEvent }: CardListProps) => {
  return (
    <ul className={styles["card-list"]}>
      {contents.map((content) =>
        isEvent ? (
          <li key={content.id}>
            <EventCard
              id={content.id}
              title={content.title}
              date={(content as Event).date}
              thumbnailUrl={(content as Event).thumbnail?.url || "/dummy.jpg"}
            />
          </li>
        ) : (
          <li key={content.id}>
            <ProductCard
              id={content.id}
              title={(content as Product).title}
              thumbnailUrl={(content as Product).thumbnail?.url || "/dummy.jpg"}
              tags={
                (content as Product).tags
                  ?.map((tag) => tag.name)
                  .filter(Boolean) as string[] || []
              }
            />
          </li>
        )
      )}
    </ul>
  );
};

export default CardList;
