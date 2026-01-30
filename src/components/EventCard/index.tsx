import Card from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

interface EventCardProps {
  id: string; // idを追加
  title: string;
  date: string;
  thumbnailUrl: string;
}

const EventCard = ({ id, title, date, thumbnailUrl }: EventCardProps) => {
  return (
    <Card>
      <Link href={`/events/${id}`}>
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
