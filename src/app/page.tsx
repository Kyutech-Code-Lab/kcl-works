import EventCard from "@/components/EventCard";

export default function Home() {
  return (
    <>
      <h1>KCL Works</h1>
      <p>Welcome to KCL Works!</p>
      <EventCard
        title="村田制作所合同ハッカソン"
        date="2025-11-03"
        thumbnailUrl="/dummy.jpg"
      />
    </>
  );
}
