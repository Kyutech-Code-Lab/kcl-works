import Card from "@/components/ui/Card";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  thumbnailUrl: string;
}

const EventCard = ({ title, date, thumbnailUrl }: EventCardProps) => {
  console.log("EventCard props:", { title, date, thumbnailUrl });
  return (
    <Card>
      <Link href={`/events/${title}`}>
        <div className={styles.thumbnail}>
          <Image
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            width={300}
            height={200}
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.date}>{date}</p>
        </div>
      </Link>
    </Card>
  );
};

export default EventCard;
