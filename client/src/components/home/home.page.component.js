import HeroHomeSection from "./sections/hero.home.section";
import SpiritHomeSection from "./sections/spirit.home.section";
import UnavoidablesHomeSection from "./sections/unavoidables.home.section";
import EventHomeSection from "./sections/event.home.section";
import GalleryHomeSection from "./sections/gallery.home.section";
import ReservationHomeSection from "./sections/reservation.home.section";

export default function HomePageComponent({ heroRef = null }) {
  return (
    <main className="overflow-x-hidden bg-[var(--site-cream)]">
      <HeroHomeSection heroRef={heroRef} />
      <SpiritHomeSection />
      <UnavoidablesHomeSection />
      <EventHomeSection />
      <GalleryHomeSection />
      <ReservationHomeSection />
    </main>
  );
}
