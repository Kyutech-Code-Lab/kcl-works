import Card from "@/components/ui/Card";
import Image from "next/image";
import styles from "./styles.module.css";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { formattedAward } from "@/lib/awardsFormatter";

interface WorkCardProps {
  id: string; // idを追加
  title: string;
  thumbnailUrl: string;
  awards?: formattedAward[];
  tags: string[];
  eventId?: string;
  eventTitle?: string;
}

const WorkCard = ({
  id,
  title,
  thumbnailUrl,
  awards,
  tags,
  eventId,
  eventTitle,
}: WorkCardProps) => {
  const href =
    eventId && eventTitle
      ? `/works/${id}?eventId=${eventId}&eventTitle=${encodeURIComponent(eventTitle)}`
      : `/works/${id}`;

  return (
    <Card>
      <Link href={href} className={styles.link}>
        {awards && (
          <div className={styles.badges}>
            {awards.map((award) => (
              <Badge key={award.awardTitle}>{award.awardTitle}</Badge>
            ))}
          </div>
        )}
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

export default WorkCard;
