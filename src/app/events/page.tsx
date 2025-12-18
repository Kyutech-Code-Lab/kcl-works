import styles from "./page.module.css";
import PageTitle from "@/components/ui/PageTitle";
import CardList from "@/components/CardList";

const dummyEvents = [
  {
    title: "KCL⭐️Hack 2024",
    date: "2024-11-15",
    thumbnailUrl: "/dummy.jpg",
  },
  {
    title: "KCL⭐️Hack 2025",
    date: "2025-12-10",
    thumbnailUrl: "/dummy.jpg",
  },
  {
    title: "村田制作所合同ハッカソン",
    date: "2025-11-03",
    thumbnailUrl: "/dummy.jpg",
  },
  {
    title: "Tech Conference 2025",
    date: "2025-09-20",
    thumbnailUrl: "/dummy.jpg",
  },
  {
    title: "Open Source Summit 2025",
    date: "2025-10-05",
    thumbnailUrl: "/dummy.jpg",
  },
  {
    title: "AI & ML Expo 2025",
    date: "2025-11-12",
    thumbnailUrl: "/dummy.jpg",
  },
  {
    title: "Web Dev Meetup 2025",
    date: "2025-08-18",
    thumbnailUrl: "/dummy.jpg",
  },
];

export default function EventsPage() {
  return (
    <div className={styles.container}>
      <PageTitle title="Events" />
      <CardList
        contents={dummyEvents}
        isEvent={true}
      />
    </div>
  );
}
