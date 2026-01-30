import styles from "./styles.module.css";
import EventCard from "@/components/EventCard";
import ProductCard from "@/components/ProductCard";
import type { Event, Product } from "@/lib/microcms";
import dateFormatter from "@/lib/dateFormater";

interface EventCardListProps {
  contents: Event[];
  isEvent: true;
}

interface ProductCardListProps {
  contents: Product[];
  isEvent: false;
  eventId?: string;
  eventTitle?: string;
}

type CardListProps = EventCardListProps | ProductCardListProps;

const CardList = ({ contents, isEvent, ...props }: CardListProps) => {
  return (
    <ul className={styles["card-list"]}>
      {isEvent
        ? contents.map((event) => (
            <li key={event.id}>
              <EventCard
                id={event.id}
                title={event.title}
                date={dateFormatter(event.date)}
                thumbnailUrl={event.thumbnail?.url || "/dummy.jpg"}
              />
            </li>
          ))
        : contents.map((product) => (
            <li key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                thumbnailUrl={product.thumbnail?.url || "/dummy.jpg"}
                tags={
                  product.tags?.map((tag) => tag.name).filter(Boolean) as
                    | string[]
                    | []
                }
                eventId={"eventId" in props ? props.eventId : undefined}
                eventTitle={
                  "eventTitle" in props ? props.eventTitle : undefined
                }
              />
            </li>
          ))}
    </ul>
  );
};

export default CardList;
