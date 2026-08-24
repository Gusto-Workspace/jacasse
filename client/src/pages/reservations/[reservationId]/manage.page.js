import ManageReservationsComponent from "@/components/reservations/manage.reservations.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";

export default function ReservationManagePage({ reservationId, manageToken }) {
  return (
    <>
      <SeoHeadComponent
        title="Gérer ma réservation - L'Esprit Jacasse"
        description="Consultez et modifiez votre réservation Jacasse, ou annulez-la en ligne si nécessaire."
        path={
          reservationId
            ? `/reservations/${reservationId}/manage`
            : "/reservations"
        }
        image="/img/home/art.webp"
        noIndex={true}
      />

      <ManageReservationsComponent
        reservationId={reservationId}
        manageToken={manageToken}
        apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { reservationId } = context.params;
  const manageToken = String(context.query?.token || "").trim();

  return {
    props: {
      reservationId: reservationId || null,
      manageToken,
    },
  };
}
