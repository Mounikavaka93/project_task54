import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, PenLine, Scissors, Users } from "lucide-react";
import { benefits, lookbook, materials, portraits, services, testimonials } from "../data/content";
import SiteFrame from "../components/layout/SiteFrame";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Photo from "../components/ui/Photo";
import PressCard from "../components/ui/PressCard";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import WhenSeen from "../components/ui/WhenSeen";
import { cx } from "../utils/cx";

const benefitIcons = [BookOpen, PenLine, Users, Scissors];

export default function LandingPage() {
  useEffect(() => {
    document.title = "Folio — A city bindery";
  }, []);

  return (
    <SiteFrame>
      <Hero />
      <MaterialIndex />
      <Lookbook />
      <About />
      <Services />
      <Highlights />
      <Stories />
      <ClosingBand />
    </SiteFrame>
  );
}

function Hero() {
  return (
    <section className="border-b border-line pb-12 pt-8 sm:pt-12 lg:pb-16">
      <Container>
        <p className="folio-press text-[0.72rem] font-medium uppercase tracking-[0.28em] text-moss">City bindery · Est. 1998</p>
        <div className="mt-4 grid items-end gap-8 lg:grid-cols-12">
          <h1 className="max-w-full font-display text-[2.45rem] leading-[0.95] text-ink sm:text-5xl lg:col-span-7 lg:text-[3.5rem] xl:text-[4.4rem]">
            <span className="folio-press inline-block" style={{ animationDelay: "80ms" }}>
              Books, rebound.
            </span>{" "}
            <span className="folio-press inline-block italic text-copper" style={{ animationDelay: "220ms" }}>
              Desks, kept.
            </span>
          </h1>
          <p className="folio-press max-w-md text-base leading-relaxed text-muted lg:col-span-5 lg:pb-2" style={{ animationDelay: "320ms" }}>
            Folio sews journals, rebinds the books you already own, and keeps a Saturday bench for people who want to learn the stitch.
          </p>
        </div>
        <div className="folio-press mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "420ms" }}>
          <Button to="/home" size="lg">
            Browse the shelf
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button to="/signin" variant="outline" size="lg">
            Member sign in
          </Button>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <figure className="folio-scene relative min-h-56 overflow-hidden sm:col-span-2 sm:min-h-80">
            <Photo
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80"
              alt="Open printed pages in close detail"
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-y-0 left-0 z-[1] w-2 bg-copper" aria-hidden="true" />
            <div className="folio-leaf pointer-events-none absolute inset-y-0 left-2 right-0 bg-paper" aria-hidden="true">
              <span
                className="absolute inset-0"
                style={{
                  backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 26px, rgba(28,35,51,0.09) 26px 27px)",
                }}
              />
            </div>
          </figure>
          <div className="h-full [perspective:900px]">
          <PressCard className="flex flex-col justify-between border border-line bg-cream p-5">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-moss">On the bench</p>
              <p className="mt-2 font-display text-2xl leading-tight text-ink">Linen Daybook</p>
              <p className="mt-2 text-sm text-muted">A5 oatmeal linen · 14-day lead · 4 left</p>
            </div>
            <p className="mt-6 font-display text-3xl text-ink">$86</p>
          </PressCard>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MaterialIndex() {
  return (
    <section aria-label="Materials in the studio" className="border-y border-line bg-cream">
      <Container className="grid grid-cols-2 gap-x-4 md:grid-cols-5 md:gap-x-8">
        {materials.map((item, index) => (
          <p key={item} className="flex min-w-0 items-baseline gap-2 border-b border-line/80 py-4 max-md:[&:nth-child(n+9)]:border-b-0 md:[&:nth-child(n+6)]:border-b-0">
            <span className="w-5 shrink-0 text-[0.68rem] tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 font-display text-base leading-tight text-ink sm:text-lg">{item}</span>
          </p>
        ))}
      </Container>
    </section>
  );
}

function Lookbook() {
  return (
    <section id="field-notes" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The bench"
            title="A spine should open, then stay open."
            text="Cloth, leather, and paper, cut in small runs. Nothing here is a souvenir."
          />
        </Reveal>
        <WhenSeen className="mt-10 grid items-stretch gap-3 md:grid-cols-12">
          <figure className="folio-wipe group relative min-h-[280px] overflow-hidden md:col-span-7 md:min-h-[520px]">
            <Photo
              src={lookbook.lead.src}
              alt={lookbook.lead.alt}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink/80 p-6 text-cream sm:p-8">
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-sand">{lookbook.lead.kicker}</p>
              <p className="mt-2 max-w-md font-display text-3xl leading-tight sm:text-4xl">{lookbook.lead.title}</p>
            </figcaption>
          </figure>
          <div className="grid gap-3 md:col-span-5 md:grid-rows-2">
            {lookbook.side.map((item, index) => (
              <figure
                key={item.caption}
                className="folio-wipe group relative h-full min-h-[200px] overflow-hidden md:min-h-0"
                style={{ animationDelay: `${0.16 + index * 0.14}s` }}
              >
                <Photo
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-ink/75 p-5 font-display text-2xl text-cream">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </WhenSeen>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="approach" className="bg-cream py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-moss">The studio</p>
          <h2 className="mt-3 font-display text-[2rem] leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
            A bindery with a bell on the door.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Folio started as two people and a nipping press above a print shop. The work is the same: sew what should be sewn, refuse glue where a book needs to open, and answer the note yourself.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Every journal is sewn in signatures.",
              "Repairs come with a photograph of the damage.",
              "A maker replies within one working day.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink sm:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-copper" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          <Photo
            src={portraits.guide}
            alt="Maker at the studio bench"
            className="aspect-[4/3] w-full object-cover sm:col-span-3 sm:aspect-[3/4]"
          />
          <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:h-full sm:grid-cols-1 sm:grid-rows-[minmax(0,1fr)_auto]">
            <Photo
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80"
              alt="Paper and notes on a work desk"
              className="aspect-square w-full object-cover sm:aspect-auto sm:h-full sm:min-h-0"
            />
            <div className="flex flex-1 flex-col justify-end bg-forest p-4 text-cream sm:p-5">
              <p className="font-display text-3xl sm:text-4xl">1998</p>
              <p className="mt-1 text-sm text-cream/75">First press on Quill Court.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Services() {
  return (
    <section id="expeditions" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The work"
            title="Four things the bench will take."
            text="Blank books, repairs, commissions, and a Saturday where you sew one yourself."
            action={
              <Button to="/home" variant="outline">
                See the shelf
              </Button>
            }
          />
        </Reveal>
        <WhenSeen className="relative mt-8">
          <span className="folio-seam pointer-events-none hidden sm:block" aria-hidden="true" />
        <div className="divide-y divide-line border-y border-line sm:pl-8">
          {services.map((service) => (
            <article key={service.index} className="grid gap-3 py-6 md:grid-cols-[4.5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-baseline md:gap-6">
              <p className="font-display text-sm text-copper">{service.index}</p>
              <h3 className="font-display text-3xl text-ink">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted sm:text-base">{service.text}</p>
            </article>
          ))}
        </div>
        </WhenSeen>
      </Container>
    </section>
  );
}

function Highlights() {
  return (
    <section id="benefits" className="bg-forest py-16 text-cream sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            light
            eyebrow="Why members stay"
            title="The book should survive the desk."
            text="Small choices — thread, paper, one maker — are the product."
          />
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <Reveal key={benefit.title} delay={index * 70}>
                <article>
                  <span className="grid h-12 w-12 place-items-center border border-cream/25">
                    <Icon className="h-5 w-5 text-sand" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl leading-tight">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">{benefit.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Stories() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = testimonials.slice(0, 4);
  const active = items[index];

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  return (
    <section id="stories" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Members" title="Notes from the desk." text="People who brought a book, or left with one." />
        </Reveal>
        <div
          className="mt-10 border border-line bg-cream p-6 sm:p-10 lg:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <blockquote key={active.id} className="folio-quote max-w-4xl font-display text-3xl leading-snug text-ink sm:text-4xl lg:text-5xl">
            “{active.quote}”
          </blockquote>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Photo src={active.portrait} alt="" className="h-12 w-12 object-cover" />
              <div>
                <p className="font-medium text-ink">{active.name}</p>
                <p className="text-sm text-muted">{active.detail}</p>
              </div>
            </div>
            <div className="flex gap-2" role="tablist" aria-label="Choose a note">
              {items.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-label={`Note from ${item.name}`}
                  onClick={() => setIndex(itemIndex)}
                  className={cx(
                    "h-12 w-12 cursor-pointer overflow-hidden border-2 transition",
                    itemIndex === index ? "border-copper" : "border-transparent opacity-70 hover:opacity-100",
                  )}
                >
                  <Photo src={item.portrait} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ClosingBand() {
  return (
    <section id="plan" className="pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <WhenSeen className="folio-foil bg-copper px-6 py-14 text-cream sm:px-12 sm:py-16">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-sand">Membership</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Open a card. Then commission the book.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85">
            Create an account to reserve a piece or a Saturday seat. A binder replies with paper, initials, and the date the bench can start.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/signup" variant="light" size="lg">
              Create an account
            </Button>
            <Button to="/signin" variant="ghost-light" size="lg">
              Sign in
            </Button>
          </div>
        </WhenSeen>
      </Container>
    </section>
  );
}
