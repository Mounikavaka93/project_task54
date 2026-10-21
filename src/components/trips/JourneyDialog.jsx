import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CalendarDays, LoaderCircle, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { formatMoney, wait } from "../../utils/format";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Photo from "../ui/Photo";
import StatusMessage from "../ui/StatusMessage";
import Stars from "../ui/Stars";

export default function JourneyDialog({ trip, onClose }) {
  const { user } = useAuth();
  const location = useLocation();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStatus("idle");
    setMessage("");
  }, [trip?.id]);

  async function requestSeat() {
    setStatus("loading");
    setMessage("");
    await wait(700);
    const verb = trip.seats === 0 ? "Waitlist note received" : "Commission received";
    setStatus("success");
    setMessage(`${verb}. A binder will write to ${user.email}. This preview keeps the note in your browser only.`);
  }

  const returnTo = `${location.pathname}${location.search}`;

  return (
    <Modal open={Boolean(trip)} title={trip?.title || "Piece"} onClose={onClose} wide>
      {trip ? (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Photo src={trip.image} alt="" className="h-56 w-full rounded-2xl object-cover sm:h-72 lg:h-full" />
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-moss">{trip.region}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
              <Stars value={trip.rating} />
              <span>{trip.reviews} reviews</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{trip.blurb}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-paper p-3">
                <dt className="flex items-center gap-1.5 text-muted">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" /> Ready
                </dt>
                <dd className="mt-1 font-medium text-ink">{trip.nextDate}</dd>
              </div>
              <div className="rounded-2xl bg-paper p-3">
                <dt className="flex items-center gap-1.5 text-muted">
                  <Users className="h-4 w-4" aria-hidden="true" /> Bench
                </dt>
                <dd className="mt-1 font-medium text-ink">{trip.group}</dd>
              </div>
              <div className="rounded-2xl bg-paper p-3">
                <dt className="text-muted">Make</dt>
                <dd className="mt-1 font-medium text-ink">{trip.level}</dd>
              </div>
              <div className="rounded-2xl bg-paper p-3">
                <dt className="text-muted">From</dt>
                <dd className="mt-1 font-medium text-ink">{formatMoney(trip.price)}</dd>
              </div>
            </dl>
            <h3 className="mt-5 text-sm font-medium text-ink">Included</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              {trip.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-5 space-y-3">
              {status === "success" ? <StatusMessage tone="success">{message}</StatusMessage> : null}
              {user && status !== "success" ? (
                <Button onClick={requestSeat} disabled={status === "loading"} className="w-full">
                  {status === "loading" ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                  {trip.seats === 0 ? "Join the waitlist" : "Commission this"}
                </Button>
              ) : null}
              {user ? null : (
                <div className="rounded-2xl border border-line bg-paper p-4">
                  <p className="text-sm text-muted">Sign in to commission this piece. You can read the full card either way.</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <Button to="/signin" state={{ from: returnTo }} size="sm">
                      Sign in
                    </Button>
                    <Button to="/signup" state={{ from: returnTo }} variant="outline" size="sm">
                      Create account
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
