import EventCard from "@/components/EventCard";
import ProductCard from "@/components/ProductCard";

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
    </>
  );
}
