import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDays, ChevronDown, Clock3, Loader2 } from "lucide-react";
import {
  formatReservationDateForApi,
  getReservationTimeOptions,
  isReservationDateClosed,
  parseReservationDateValue,
} from "@/utils/reservations";

const peopleOptions = Array.from({ length: 12 }, (_, index) =>
  String(index + 1),
);

export default function EditReservationAvailability({
  apiBaseUrl,
  manageToken,
  restaurant,
  reservation,
  editData,
  setEditData,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const datePickerRef = useRef(null);
  const [reservationsList, setReservationsList] = useState([]);
  const [slotCoverUsage, setSlotCoverUsage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadAvailability() {
      if (!apiBaseUrl || !manageToken || !restaurant?._id || !reservation?._id) {
        if (isCurrent) {
          setReservationsList([]);
          setSlotCoverUsage([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setAvailabilityError("");

        const query = new URLSearchParams({
          excludeReservationId: String(reservation._id),
          token: manageToken,
          from: formatReservationDateForApi(editData.reservationDate),
          to: formatReservationDateForApi(editData.reservationDate),
        });
        const response = await fetch(
          `${apiBaseUrl}/public/restaurants/${restaurant._id}/reservations?${query.toString()}`,
        );
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data?.message || "Impossible de charger les créneaux disponibles.",
          );
        }

        if (isCurrent) {
          setReservationsList(
            Array.isArray(data?.reservations) ? data.reservations : [],
          );
          setSlotCoverUsage(
            Array.isArray(data?.slotCoverUsage) ? data.slotCoverUsage : [],
          );
        }
      } catch (error) {
        if (isCurrent) {
          setReservationsList([]);
          setSlotCoverUsage([]);
          setAvailabilityError(
            error?.message || "Impossible de charger les créneaux disponibles.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadAvailability();

    return () => {
      isCurrent = false;
    };
  }, [apiBaseUrl, editData.reservationDate, manageToken, restaurant?._id, reservation?._id]);

  const timeOptions = useMemo(
    () =>
      getReservationTimeOptions({
        reservationDate: editData.reservationDate,
        numberOfGuests: editData.numberOfGuests,
        restaurant,
        reservationsList,
        slotCoverUsage,
        excludeReservationId: reservation?._id,
      }).filter((option) => option.type === "available"),
    [
      editData.reservationDate,
      editData.numberOfGuests,
      restaurant,
      reservationsList,
      slotCoverUsage,
      reservation?._id,
    ],
  );
  const guestOptions = useMemo(() => {
    const currentGuests = String(editData.numberOfGuests || "").trim();
    if (!currentGuests || peopleOptions.includes(currentGuests)) {
      return peopleOptions;
    }

    return [...peopleOptions, currentGuests].sort(
      (a, b) => Number(a) - Number(b),
    );
  }, [editData.numberOfGuests]);

  const selectedDate =
    parseReservationDateValue(editData.reservationDate) || new Date();

  useEffect(() => {
    if (!showCalendar) return undefined;

    function handlePointerDown(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [showCalendar]);

  function handleDateChange(value) {
    const nextDate = Array.isArray(value) ? value[0] : value;
    if (!(nextDate instanceof Date) || Number.isNaN(nextDate.getTime())) return;

    setEditData((current) => ({
      ...current,
      reservationDate: formatReservationDateForApi(nextDate),
      reservationTime: "",
    }));
  }

  function handleGuestsChange(event) {
    setEditData((current) => ({
      ...current,
      numberOfGuests: event.target.value,
      reservationTime: "",
    }));
  }

  return (
    <div className="mt-5 flex flex-col gap-5 text-[var(--site-ink)] tablet:gap-6">
      <div className="grid overflow-visible gap-5 tablet:grid-cols-2 tablet:gap-6">
        <div ref={datePickerRef} className="relative z-30">
          <button
            type="button"
            onClick={() => setShowCalendar((current) => !current)}
            className="flex h-[90.5px] w-full items-center justify-between rounded-[10px] border border-[rgba(20,72,47,0.18)] bg-white px-5 py-4 text-left shadow-[0_12px_30px_rgba(19,24,20,0.06)] transition"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--site-ink)]">
                Date
              </p>
              <p className="mt-1 text-[18px] text-[var(--site-ink-soft)] tablet:text-[20px]">
                {format(selectedDate, "dd/MM/yyyy")}
              </p>
            </div>
            <CalendarDays size={24} strokeWidth={1.8} className="text-[var(--site-ink)]" />
          </button>

          {showCalendar ? (
            <div className="absolute left-0 top-[calc(100%+12px)] z-[80] w-full rounded-[16px] border border-[rgba(20,72,47,0.14)] bg-white px-4 pb-4 pt-8 shadow-[0_24px_60px_rgba(19,24,20,0.14)]">
              <div className="reservation-calendar-wrapper overflow-visible">
                <Calendar
                  onChange={(value) => {
                    handleDateChange(value);
                    setShowCalendar(false);
                  }}
                  value={selectedDate}
                  view="month"
                  locale="fr-FR"
                  minDate={new Date()}
                  tileDisabled={({ date, view }) =>
                    view === "month" &&
                    isReservationDateClosed({ reservationDate: date, restaurant })
                  }
                  className="reservation-calendar w-full border-none bg-transparent"
                />
              </div>
            </div>
          ) : null}
        </div>

        <label className="flex min-h-[82px] items-center justify-between gap-4 rounded-[10px] border border-[rgba(20,72,47,0.18)] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(19,24,20,0.06)]">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--site-ink)]">
              Nombre de personnes
            </p>
            <div className="relative mt-2">
              <select
                id="reservation-edit-guests"
                value={editData.numberOfGuests}
                onChange={handleGuestsChange}
                required
                className="h-[32px] w-full appearance-none bg-white pr-10 text-[18px] leading-[32px] text-[var(--site-ink-soft)] outline-none tablet:text-[20px]"
              >
                {guestOptions.map((value) => (
                  <option key={value} value={value}>
                    {value} {Number(value) > 1 ? "personnes" : "personne"}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} strokeWidth={1.4} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[var(--site-ink-soft)]" />
            </div>
          </div>
        </label>

        <label className="flex min-h-[82px] items-center justify-between gap-4 rounded-[10px] border border-[rgba(20,72,47,0.18)] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(19,24,20,0.06)]">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--site-ink)]">
              Heure
            </p>
            <div className="relative mt-2">
              <select
                id="reservation-edit-time"
                value={editData.reservationTime}
                onChange={(event) =>
                  setEditData((current) => ({
                    ...current,
                    reservationTime: event.target.value,
                  }))
                }
                required
                className="h-[32px] w-full appearance-none bg-white pr-10 text-[18px] leading-[32px] text-[var(--site-ink-soft)] outline-none tablet:text-[20px]"
              >
                <option value="">Sélectionnez une heure</option>
                {timeOptions.map((option) => (
                  <option key={option.time} value={option.time}>
                    {formatTimeDisplay(option.time)}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} strokeWidth={1.4} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[var(--site-ink-soft)]" />
            </div>
          </div>
          <Clock3 size={24} strokeWidth={1.8} className="shrink-0 text-[var(--site-ink)]" />
          {isLoading ? <Loader2 size={14} className="animate-spin text-[var(--site-ink-soft)]" /> : null}
        </label>
      </div>

      {availabilityError ? (
        <p className="text-[14px] leading-[1.7] text-red-700">{availabilityError}</p>
      ) : null}

      {!isLoading && !availabilityError && timeOptions.length === 0 ? (
        <p className="text-[14px] leading-[1.7] text-[var(--site-ink-soft)]">
          Aucun créneau disponible pour cette date.
        </p>
      ) : null}

    </div>
  );
}

function formatTimeDisplay(value) {
  const [hour, minute] = String(value || "").slice(0, 5).split(":");
  return `${hour}h${minute}`;
}
