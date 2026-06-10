import BankHoldReservationsComponent from "@/components/reservations/bank-hold.reservations.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";

export default function ReservationBankHoldPage({ reservationId }) {
  return (
    <>
      <SeoHeadComponent
        title="Validation carte - L'Esprit Jacasse"
        description="Validez l’empreinte bancaire liée à votre réservation Jacasse."
        path={
          reservationId
            ? `/reservations/${reservationId}/bank-hold`
            : "/reservations"
        }
        image="/img/home/art.webp"
        noIndex={true}
      />

      <BankHoldReservationsComponent
        reservationId={reservationId}
        apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
        stripePublishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { reservationId } = context.params;

  return {
    props: {
      reservationId: reservationId || null,
    },
  };
}
