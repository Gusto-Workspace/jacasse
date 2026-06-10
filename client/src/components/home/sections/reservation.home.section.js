import { useContext } from "react";
import ReservationCtaComponent from "../../_shared/reservation-cta/reservation-cta.component";
import { GlobalContext } from "@/contexts/global.context";

export default function ReservationHomeSection() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;

  return <ReservationCtaComponent phone={restaurantData?.phone} />;
}
