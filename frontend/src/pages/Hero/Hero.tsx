import HeroAside from "./components/HeroAside";
import CardsColumn from "./components/CardsColumn";

export default function Hero() {
  return (
    <section className="min-h-screen w-screen flex items-stretch">
      <div className="relative z-10 block md:grid md:min-h-screen w-screen box-border px-4 sm:px-6 md:px-0 md:grid-cols-5 md:gap-8 items-stretch space-y-8 sm:space-y-10 md:space-y-0">
        <div className="md:col-span-2 md:pr-4">
          <HeroAside />
        </div>
        <div className="md:col-span-3 md:px-8 lg:px-12">
          <CardsColumn />
        </div>
      </div>
    </section>
  );
}
