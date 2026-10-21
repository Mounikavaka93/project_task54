import { ArrowUpRight } from "lucide-react";
import { formatMoney } from "../../utils/format";
import Photo from "../ui/Photo";
import Stars from "../ui/Stars";

export default function TripCard({ trip, onOpen }) {
  const seatLabel = trip.seats === 0 ? "Waitlist" : trip.seats <= 4 ? `${trip.seats} left` : "In stock";

  return (
    <article className="group flex h-full flex-col">
      <button type="button" onClick={() => onOpen(trip)} className="cursor-pointer text-left">
        <div className="relative overflow-hidden rounded-[1.6rem]">
          <Photo
            src={trip.image}
            alt={`${trip.title} in ${trip.region}`}
            className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-105 sm:aspect-[5/4]"
          />
          <span className="folio-dogear" aria-hidden="true" />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-cream/95 px-3 py-1 text-xs font-medium text-ink">{trip.category}</span>
            <span className="rounded-full bg-forest/90 px-3 py-1 text-xs font-medium text-cream">{seatLabel}</span>
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 px-1 pt-4">
          <div className="min-w-0">
            <p className="truncate text-xs uppercase tracking-[0.16em] text-moss">{trip.region}</p>
            <p className="mt-2 font-display text-2xl leading-tight text-ink transition group-hover:text-copper">{trip.title}</p>
          </div>
          <span className="mt-6 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-cream">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-3 px-1 text-sm leading-relaxed text-muted">{trip.blurb}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Stars value={trip.rating} />
            <span className="text-muted">{trip.rating.toFixed(1)}</span>
          </span>
          <span className="text-muted">{trip.days}-day lead</span>
          <span className="font-medium text-ink">{formatMoney(trip.price)}</span>
        </div>
      </button>
    </article>
  );
}
