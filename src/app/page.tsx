import EventCard from "@/components/EventCard";
import ProductCard from "@/components/ProductCard";
import Paper from "@/components/ui/Paper";

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
      <ProductCard
        title="イマジナリーシェフ"
        thumbnailUrl="/dummy.jpg"
        tags={["料理", "レシピ", "Gemini", "Next.js"]}
      />
      <Paper>
        <h2>About KCL Works</h2>
        <p>KCL Works is a platform showcasing projects.</p>
      </Paper>
    </>
  );
}
