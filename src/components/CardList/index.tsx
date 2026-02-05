import styles from "./styles.module.css";
import EventCard from "@/components/EventCard";
import WorkCard from "@/components/WorkCard";
import type { Event, Work } from "@/lib/microcms";
import dateFormatter from "@/lib/dateFormater";

interface EventCardListProps {
  contents: Event[];
  isEvent: true;
}

interface WorkCardListProps {
  contents: Work[];
  isEvent: false;
  eventId?: string;
  eventTitle?: string;
}

type CardListProps = EventCardListProps | WorkCardListProps;

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
        : contents.map((work) => (
            <li key={work.id}>
              <WorkCard
                id={work.id}
                title={work.title}
                thumbnailUrl={work.thumbnail?.url || "/dummy.jpg"}
                tags={
                  work.tags?.map((tag) => tag.name).filter(Boolean) as
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
