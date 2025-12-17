import Card from "@/components/ui/Card";
import Image from "next/image";
import styles from "./styles.module.css";

interface EventCardProps {
  title: string;
  date: string;
  thumbnailUrl: string;
}

const EventCard = ({ title, date, thumbnailUrl }: EventCardProps) => {
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
        <p className={styles.date}>{date}</p>
      </div>
    </Card>
  );
};

export default EventCard;
