import styles from "./page.module.css";
import Hero from "@/components/ui/Hero";

const EventDetailsPage = () => {
  return (
    <div className={styles.container}>
      <Hero title="村田制作所合同ハッカソン" imageUrl="/dummy.jpg" />
      <div className={styles.content}>
        <h2>Event Details</h2>
        <p>
          This is a sample event description. Here you can provide details about
          the event, including date, time, location, and any other relevant
          information.
        </p>
      </div>
    </div>
  );
};

export default EventDetailsPage;
