import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BadgeCheck,
  BookOpen,
  Bookmark,
  Hammer,
  Headset,
  Layers,
  Leaf,
  LoaderCircle,
  Notebook,
  PenLine,
  ScrollText,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  categories,
  faqs,
  filterTrips,
  gallery,
  homeBenefits,
  stats,
  steps,
  testimonials,
  trips,
} from "../data/content";
import FaqList from "../components/home/FaqList";
import NewsletterForm from "../components/home/NewsletterForm";
import StatsBand from "../components/home/StatsBand";
import Container from "../components/layout/Container";
import SiteFrame from "../components/layout/SiteFrame";
import JourneyDialog from "../components/trips/JourneyDialog";
import TripCard from "../components/trips/TripCard";
import Button from "../components/ui/Button";
import Photo from "../components/ui/Photo";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { SelectField } from "../components/ui/TextField";
import Stars from "../components/ui/Stars";
import { useAuth } from "../context/AuthContext";
import { cx } from "../utils/cx";
import { firstName, formatMoney, greeting } from "../utils/format";

const categoryIcons = {
  Journals: Notebook,
  Restoration: PenLine,
  Cloth: Layers,
  Leather: Bookmark,
  Workshops: Hammer,
  Paper: ScrollText,
};

const benefitIcons = [Users, BookOpen, BadgeCheck, Headset, ShieldCheck, Leaf];

export default function HomePage() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "All";
  const duration = params.get("duration") || "Any";
  const query = params.get("q") || "";
  const [draft, setDraft] = useState(query);
  const [durationDraft, setDurationDraft] = useState(duration);
  const [categoryDraft, setCategoryDraft] = useState(category);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyNote, setCopyNote] = useState("");
  const filterKey = `${query}|${category}|${duration}`;
  const previousFilters = useRef(filterKey);

  useEffect(() => {
    document.title = "The shelf — Folio";
  }, []);

  useEffect(() => {
    setDraft(query);
    setDurationDraft(duration);
    setCategoryDraft(category);
  }, [query, duration, category]);

  useEffect(() => {
    if (previousFilters.current === filterKey) return undefined;
    previousFilters.current = filterKey;
    setLoading(true);
    const loadingId = window.setTimeout(() => setLoading(false), 450);
    const scrollId = window.setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
    return () => {
      window.clearTimeout(loadingId);
      window.clearTimeout(scrollId);
    };
  }, [filterKey]);

  useEffect(() => {
    const current = new URLSearchParams(window.location.search);
    if (!(current.get("category") || current.get("q") || current.get("duration"))) return undefined;
    const id = window.setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 80);
    return () => window.clearTimeout(id);
  }, []);

  const filtersActive = Boolean(query || category !== "All" || duration !== "Any");
  const filtered = useMemo(
    () => filterTrips(trips, { query, category, duration }),
    [query, category, duration],
  );
  const featured = trips.filter((trip) => trip.featured);
  const featuredIds = new Set(featured.map((trip) => trip.id));
  const trending = trips.filter((trip) => trip.trending && !featuredIds.has(trip.id));
  const visible = filtersActive ? filtered : featured;
  const selected = trips.find((trip) => trip.id === params.get("trip")) || null;
  const scarce = trips.filter((trip) => trip.seats > 0 && trip.seats <= 4).length;

  function scrollToResults() {
    window.setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  function writeParams(mutate, replace = true) {
    const next = new URLSearchParams(params);
    mutate(next);
    setParams(next, { replace });
  }

  function onSearch(event) {
    event.preventDefault();
    writeParams((next) => {
      const trimmed = draft.trim();
      if (trimmed) next.set("q", trimmed);
      else next.delete("q");
      if (durationDraft !== "Any") next.set("duration", durationDraft);
      else next.delete("duration");
      if (categoryDraft !== "All") next.set("category", categoryDraft);
      else next.delete("category");
      next.delete("trip");
    });
    scrollToResults();
  }

  function toggleCategory(name) {
    writeParams((next) => {
      if (category === name) next.delete("category");
      else next.set("category", name);
      next.delete("trip");
    });
    scrollToResults();
  }

  function clearFilters() {
    writeParams((next) => {
      next.delete("q");
      next.delete("category");
      next.delete("duration");
    });
  }

  function openTrip(trip) {
    writeParams((next) => next.set("trip", trip.id), false);
  }

  function closeTrip() {
    writeParams((next) => next.delete("trip"));
  }

  function showClothOffer() {
    setDraft("");
    setDurationDraft("Any");
    setCategoryDraft("Cloth");
    writeParams((next) => {
      next.set("category", "Cloth");
      next.delete("q");
      next.delete("duration");
      next.delete("trip");
    });
    scrollToResults();
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText("CLOTHBOUND");
      setCopied(true);
      setCopyNote("");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopyNote("Copy was blocked. Use the code CLOTHBOUND.");
    }
  }

  const headline = user ? `${greeting()}, ${firstName(user.fullName)}.` : "Find the book that belongs on the desk.";

  return (
    <SiteFrame>
      <section id="explore" className="relative">
        <div className="relative min-h-[560px] sm:min-h-[620px]">
          <Photo
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=80"
            alt="Library shelves packed with books"
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25" />
          <Container className="relative z-10 flex min-h-[560px] flex-col justify-end pb-28 sm:min-h-[620px] sm:pb-32">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand">On the shelf this month</p>
            <h1 className="folio-press mt-3 max-w-3xl font-display text-[2.4rem] leading-[1.02] text-cream sm:text-6xl">{headline}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              {scarce} pieces have fewer than five copies left. Search by cloth, leather, paper, or how many days you can wait.
            </p>
          </Container>
        </div>
        <Container className="relative z-20 -mt-16 sm:-mt-20">
          <form
            onSubmit={onSearch}
            className="folio-sheet grid gap-3 rounded-[1.6rem] border border-line bg-cream p-4 shadow-[0_30px_70px_-40px_rgba(20,24,22,0.7)] sm:p-5 md:grid-cols-2 md:items-end xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_auto]"
          >
            <div>
              <label htmlFor="trip-search" className="mb-1.5 block text-sm font-medium text-ink">
                Find a piece
              </label>
              <div className="flex h-12 items-center rounded-xl border border-line bg-paper px-3 focus-within:border-forest">
                <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                <input
                  id="trip-search"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="linen, restoration, leather"
                  className="h-full min-w-0 flex-1 bg-transparent px-2 text-base text-ink outline-none placeholder:text-muted/70"
                />
              </div>
            </div>
            <SelectField id="trip-duration" label="Lead time" value={durationDraft} onChange={(event) => setDurationDraft(event.target.value)}>
              <option value="Any">Any lead time</option>
              <option value="short">Short · up to 10 days</option>
              <option value="medium">Medium · 11 to 20 days</option>
              <option value="long">Long · 21 days or more</option>
            </SelectField>
            <SelectField
              id="trip-landscape"
              label="Material"
              value={categoryDraft}
              onChange={(event) => setCategoryDraft(event.target.value)}
            >
              <option value="All">All materials</option>
              {categories.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </SelectField>
            <Button type="submit" className="w-full xl:w-auto">
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
              Search
            </Button>
          </form>
        </Container>
      </section>

      <section id="categories" className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The shelf"
              title="Start with the kind of book you need."
              text="Choose a material or a kind of work. Choose it again to clear."
            />
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {categories.map((item) => {
              const Icon = categoryIcons[item.name];
              const active = category === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleCategory(item.name)}
                  className={cx(
                    "folio-stitch group relative h-40 cursor-pointer overflow-hidden rounded-[1.4rem] text-left sm:h-52",
                    active && "ring-2 ring-copper ring-offset-2 ring-offset-paper",
                  )}
                >
                  <Photo
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
                  <span className="absolute bottom-0 left-0 right-0 p-4 text-cream">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="mt-2 block font-display text-2xl">{item.name}</span>
                    <span className="mt-1 hidden text-sm text-cream/80 sm:block">{item.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="results" className="pb-16 sm:pb-20" aria-busy={loading}>
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-moss">
                {filtersActive ? "Search results" : "Featured"}
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink sm:text-4xl lg:text-5xl">
                {filtersActive ? "Pieces that match." : "On the bench now."}
              </h2>
              <p className="mt-3 max-w-xl text-muted">
                {filtersActive
                  ? `${filtered.length} ${filtered.length === 1 ? "piece matches" : "pieces match"} your filters.`
                  : "Journals, repairs, and paper with a date you can plan around."}
              </p>
            </div>
            {filtersActive ? (
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            ) : null}
          </div>

          {loading ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="animate-pulse" aria-hidden="true">
                  <div className="aspect-[4/5] rounded-[1.6rem] bg-sand sm:aspect-[5/4]" />
                  <div className="mt-4 h-3 w-28 rounded bg-sand" />
                  <div className="mt-3 h-6 w-4/5 rounded bg-sand" />
                  <div className="mt-3 h-3 w-full rounded bg-sand" />
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="mt-8 rounded-[1.6rem] border border-dashed border-line bg-cream px-6 py-16 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-copper" aria-hidden="true" />
              <h3 className="mt-4 font-display text-3xl text-ink">No pieces match that search</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                Try linen, leather, or restoration. Clearing the filters shows the full shelf.
              </p>
              <Button className="mt-6" onClick={clearFilters}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className={cx("mt-8 grid gap-8 sm:grid-cols-2", filtersActive ? "lg:grid-cols-3" : "xl:grid-cols-4")}>
              {visible.map((trip) => (
                <TripCard key={trip.id} trip={trip} onOpen={openTrip} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How an order works"
              title="Three steps, then a maker takes the book."
            />
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.index} className="rounded-[1.5rem] border border-line bg-paper p-6">
                <p className="font-display text-sm text-copper">{step.index}</p>
                <h3 className="mt-5 font-display text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The standard"
              title="What is included is the point."
              text="These are the promises on every journal, repair, and commission."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <article
                  key={benefit.title}
                  className="rounded-[1.5rem] border border-line bg-cream p-6 transition duration-300 hover:-translate-y-1 hover:border-copper/40"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sage text-forest">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="trending" className="pb-16 sm:pb-20">
        {filtersActive ? (
          <Container>
            <SectionHeading
              eyebrow="Trending"
              title="Paused while you are searching."
              text="Clear the filters to see what members are commissioning this month."
              action={
                <Button variant="outline" onClick={clearFilters}>
                  Show trending
                </Button>
              }
            />
          </Container>
        ) : (
          <Container>
            <SectionHeading
              eyebrow="Trending"
              title="Pieces members are commissioning."
              text="A shorter list, drawn from orders that moved in the last few weeks."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {trending.map((trip) => (
                <button
                  key={trip.id}
                  type="button"
                  onClick={() => openTrip(trip)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border border-line bg-cream text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-34px_rgba(20,24,22,0.6)] sm:flex-row"
                >
                  <Photo
                    src={trip.image}
                    alt=""
                    className="h-48 w-full object-cover transition duration-700 group-hover:scale-105 sm:w-48 sm:shrink-0"
                  />
                  <span className="flex min-w-0 flex-1 flex-col p-5">
                    <span className="text-xs uppercase tracking-[0.16em] text-moss">{trip.category}</span>
                    <span className="mt-2 font-display text-2xl text-ink group-hover:text-copper">{trip.title}</span>
                    <span className="mt-2 text-sm text-muted">{trip.region}</span>
                    <span className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                      <Stars value={trip.rating} />
                      <span className="text-muted">{trip.days}-day lead</span>
                      <span className="font-medium text-ink">{formatMoney(trip.price)}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </Container>
        )}
      </section>

      <section id="offers" className="pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-[1.8rem] lg:col-span-2">
              <Photo
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80"
                alt="A row of colorful book spines"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-forest-deep/75" />
              <div className="relative flex min-h-[320px] flex-col justify-end p-6 text-cream sm:p-10">
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-sand">Cloth run</p>
                <h2 className="mt-3 max-w-lg font-display text-4xl leading-tight sm:text-5xl">Twenty percent off cloth rebinds.</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">
                  Use the code before December 1 on cloth novels and albums. The preview applies the filter, not a charge.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={copyCode}
                    className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-cream px-5 text-sm font-medium text-forest transition hover:bg-white"
                  >
                    {copied ? "Copied" : "Copy CLOTHBOUND"}
                  </button>
                  <Button variant="ghost-light" onClick={showClothOffer}>
                    View cloth pieces
                  </Button>
                </div>
                {copyNote ? <p className="mt-3 text-sm text-sand">{copyNote}</p> : null}
              </div>
            </div>
            <button
              type="button"
              onClick={() => openTrip(trips[0])}
              className="group relative min-h-[280px] cursor-pointer overflow-hidden rounded-[1.8rem] text-left"
            >
              <Photo src={trips[0].image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/10" />
              <span className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <span className="text-xs uppercase tracking-[0.16em] text-sand">Few copies</span>
                <span className="mt-2 block font-display text-3xl">{trips[0].title}</span>
                <span className="mt-2 block text-sm text-cream/80">{trips[0].seats} left · {trips[0].nextDate}</span>
              </span>
            </button>
          </div>
        </Container>
      </section>

      <section className="bg-sand/70 py-16 sm:py-20">
        <Container>
          <StatsBand items={stats} />
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Members" title="From the last few seasons at the bench." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.id} className="flex h-full flex-col rounded-[1.5rem] border border-line bg-cream p-6">
                <Stars value={5} />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">“{item.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Photo src={item.portrait} alt="" className="h-11 w-11 rounded-full object-cover" />
                  <span>
                    <span className="block text-sm font-medium text-ink">{item.name}</span>
                    <span className="block text-sm text-muted">{item.detail}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section id="gallery" className="pb-16 sm:pb-20">
        <Container>
          <SectionHeading
            eyebrow="Studio"
            title="A few frames from the bench."
            text="Hover a photograph on larger screens. The caption stays visible on a phone."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <figure
                key={item.caption}
                className={cx(
                  "group relative overflow-hidden rounded-[1.4rem]",
                  index === 0 ? "col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto lg:min-h-[28rem]" : "aspect-[4/5]",
                )}
              >
                <Photo
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-3 text-sm text-cream sm:p-4 sm:opacity-0 sm:transition sm:duration-300 sm:group-hover:opacity-100">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="bg-cream py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Questions"
            title="Before you commission a piece."
            text="If the answer you need is not here, the account form is the fastest way to reach a binder."
          />
          <FaqList items={faqs} />
        </Container>
      </section>

      <section id="newsletter" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 rounded-[1.8rem] bg-forest px-6 py-10 text-cream sm:px-10 lg:grid-cols-2 lg:items-center lg:px-12">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-sand">Studio notes</p>
              <h2 className="mt-3 font-display text-4xl leading-tight">A short letter when a run opens.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75">
                No weekly blast. We write when a cloth, a repair slot, or a Saturday bench is worth your time.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>

      <section id="reserve" className="pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="rounded-[1.8rem] border border-line bg-cream px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">The bench is open when you are.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Create an account to commission a piece, or keep browsing. The dates above are the ones with room on the shelf.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to={user ? "/home#results" : "/signup"} size="lg">
                {user ? "Back to the shelf" : "Create an account"}
              </Button>
              <Button href="#explore" variant="outline" size="lg">
                Search again
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <JourneyDialog trip={selected} onClose={closeTrip} />
    </SiteFrame>
  );
}
