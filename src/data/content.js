const photo = (id, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const portraits = {
  priya: photo("1494790108377-be9c29b29330", 480),
  jonah: photo("1500648767791-00dcc994a43e", 480),
  amira: photo("1438761681033-6461ffad8d80", 480),
  leo: photo("1507003211169-0a1dd7228f2d", 480),
  helena: photo("1544005313-94ddf0286df2", 480),
  marcus: photo("1506794778202-cad84cf45f1d", 480),
  guide: photo("1524504388940-b1c1722653e1", 900),
};

export const trips = [
  {
    id: "linen-daybook",
    title: "Linen Daybook",
    region: "A5 · oatmeal linen",
    category: "Journals",
    days: 14,
    price: 86,
    rating: 4.9,
    reviews: 128,
    seats: 4,
    nextDate: "Ready Nov 18",
    level: "Hand-sewn",
    group: "One maker",
    blurb: "A plain daybook with a linen cover, cotton paper, and a spine that opens flat on a desk.",
    image: photo("1517842645767-c639042777db"),
    featured: true,
    trending: true,
    includes: ["160 blank pages", "Linen thread", "Named endpaper", "Cloth slip sleeve"],
  },
  {
    id: "night-ledger",
    title: "Night Ledger",
    region: "A4 · bridle leather",
    category: "Leather",
    days: 21,
    price: 164,
    rating: 5,
    reviews: 86,
    seats: 6,
    nextDate: "Ready Jan 9",
    level: "Hand-sewn",
    group: "One maker",
    blurb: "A dark ledger for long notes, with a brass clasp and paper that takes fountain ink.",
    image: photo("1544816155-12df9643f363"),
    featured: true,
    trending: true,
    includes: ["Leather cover", "Brass clasp", "192 pages", "Foil initials"],
  },
  {
    id: "family-repair",
    title: "Family Book Repair",
    region: "Bring your own volume",
    category: "Restoration",
    days: 28,
    price: 240,
    rating: 4.8,
    reviews: 64,
    seats: 3,
    nextDate: "Bench opens Mar 4",
    level: "Conservation",
    group: "Senior binder",
    blurb: "We keep the cover you have, rebuild the sewing, and tell you what we refused to replace.",
    image: photo("1524995997946-a1c2e315a42f"),
    featured: true,
    trending: false,
    includes: ["Condition note", "Resewn signatures", "New hinges if needed", "Photo record"],
  },
  {
    id: "cloth-novel",
    title: "Cloth Novel Rebind",
    region: "Octavo · bookcloth",
    category: "Cloth",
    days: 18,
    price: 120,
    rating: 4.9,
    reviews: 97,
    seats: 8,
    nextDate: "Ready Apr 12",
    level: "Case binding",
    group: "One maker",
    blurb: "A paperback or tired hardcover, rebound in colored cloth with a simple spine label.",
    image: photo("1495446815901-a7297e633e8d"),
    featured: false,
    trending: true,
    includes: ["Bookcloth case", "Paper label", "Sewn text block", "Your title stamped"],
  },
  {
    id: "letter-set",
    title: "Pressed Letter Set",
    region: "A5 sheets · cotton",
    category: "Paper",
    days: 7,
    price: 42,
    rating: 4.7,
    reviews: 74,
    seats: 12,
    nextDate: "Ready May 2",
    level: "Studio press",
    group: "Print desk",
    blurb: "Twenty-four sheets and envelopes, letterpress rules, no pattern fighting the handwriting.",
    image: photo("1455390582262-044cdead277a"),
    featured: false,
    trending: false,
    includes: ["24 sheets", "24 envelopes", "Debossed rule", "Glassine wrap"],
  },
  {
    id: "bench-saturday",
    title: "Saturday Bench",
    region: "Studio · 4 hours",
    category: "Workshops",
    days: 1,
    price: 95,
    rating: 4.8,
    reviews: 63,
    seats: 6,
    nextDate: "Jun 8",
    level: "Beginner",
    group: "Six seats",
    blurb: "Sew a pamphlet, learn the tools, and leave with a small book you made yourself.",
    image: photo("1513475382585-d06e58bcb0e0"),
    featured: false,
    trending: true,
    includes: ["Tools for the day", "Paper and thread", "Tea", "A finished pamphlet"],
  },
  {
    id: "vellum-guest",
    title: "Vellum Guest Book",
    region: "Folio · wide",
    category: "Journals",
    days: 21,
    price: 210,
    rating: 4.9,
    reviews: 41,
    seats: 5,
    nextDate: "Ready Sep 14",
    level: "Commission",
    group: "One maker",
    blurb: "A wide book for a table: thick paper, a quiet cover, and room for long names.",
    image: photo("1519682337058-a94d519337bc"),
    featured: true,
    trending: false,
    includes: ["120 leaves", "Ribbon marker", "Cloth cover", "Name on the pastedown"],
  },
  {
    id: "thesis-bind",
    title: "Thesis Binding",
    region: "A4 · cloth",
    category: "Restoration",
    days: 12,
    price: 78,
    rating: 4.6,
    reviews: 112,
    seats: 9,
    nextDate: "Ready Oct 3",
    level: "Case binding",
    group: "Print desk",
    blurb: "A clean cloth binding for a document that should look kept, not laminated.",
    image: photo("1521587760476-6c12a4b040da"),
    featured: false,
    trending: false,
    includes: ["Printed title", "Sewn or adhesive, your choice", "Cloth case", "Two copies"],
  },
  {
    id: "bridle-journal",
    title: "Bridle Journal",
    region: "Pocket · chestnut",
    category: "Leather",
    days: 16,
    price: 148,
    rating: 4.8,
    reviews: 69,
    seats: 0,
    nextDate: "Waitlist · Aug",
    level: "Hand-sewn",
    group: "One maker",
    blurb: "A pocket journal in bridle leather. The current run is spoken for.",
    image: photo("1471107340929-a87cd0f5b5f3"),
    featured: false,
    trending: true,
    includes: ["Pocket format", "Leather wrap", "96 pages", "Elastic or clasp"],
  },
  {
    id: "pamphlet-kit",
    title: "Pamphlet Stitch Kit",
    region: "Home bench",
    category: "Workshops",
    days: 3,
    price: 36,
    rating: 4.7,
    reviews: 88,
    seats: 14,
    nextDate: "Ships in 3 days",
    level: "Kit",
    group: "Packed to order",
    blurb: "Needle, linen thread, five signatures, and a card that assumes you have never sewn a book.",
    image: photo("1516414447565-b14be0adf13e"),
    featured: false,
    trending: false,
    includes: ["Needle and thread", "Five signatures", "Cover sheet", "Instruction card"],
  },
  {
    id: "marbled-ends",
    title: "Marbled Endpapers",
    region: "Sheets · pair",
    category: "Paper",
    days: 10,
    price: 28,
    rating: 4.8,
    reviews: 54,
    seats: 11,
    nextDate: "Ready Sep 28",
    level: "Studio press",
    group: "Paper desk",
    blurb: "A pair of marbled sheets for a rebind, made in small pulls so no two books match.",
    image: photo("1457369804613-52c61a468e7d"),
    featured: false,
    trending: true,
    includes: ["Two sheets", "Cotton paper", "Named pull", "Flat mailer"],
  },
  {
    id: "heirloom-album",
    title: "Heirloom Album",
    region: "Square · cloth",
    category: "Cloth",
    days: 24,
    price: 190,
    rating: 5,
    reviews: 37,
    seats: 4,
    nextDate: "Ready Nov 2",
    level: "Commission",
    group: "One maker",
    blurb: "A square album with guarded leaves, built for photographs that should not be glued down.",
    image: photo("1457369804613-52c61a468e7d"),
    featured: false,
    trending: false,
    includes: ["Guarded leaves", "Cloth case", "Photo corners", "Spine label"],
  },
];

export const categories = [
  {
    name: "Journals",
    description: "Blank books for daily use",
    image: photo("1512820790803-83ca734da794", 1200),
  },
  {
    name: "Restoration",
    description: "Repair that keeps the book",
    image: photo("1524995997946-a1c2e315a42f", 1200),
  },
  {
    name: "Cloth",
    description: "Cases in colored bookcloth",
    image: photo("1495446815901-a7297e633e8d", 1200),
  },
  {
    name: "Leather",
    description: "Long-wear covers and clasps",
    image: photo("1544816155-12df9643f363", 1200),
  },
  {
    name: "Workshops",
    description: "Saturday benches and kits",
    image: photo("1455390582262-044cdead277a", 1200),
  },
  {
    name: "Paper",
    description: "Sheets, letters, endpapers",
    image: photo("1516414447565-b14be0adf13e", 1200),
  },
];

export const services = [
  {
    index: "01",
    title: "Blank journals",
    text: "Books with nothing in them yet. Linen, cloth, or leather, sewn so the page lies open.",
  },
  {
    index: "02",
    title: "Restoration",
    text: "Family books, bibles, and paperbacks worth keeping. We repair the structure and leave the history.",
  },
  {
    index: "03",
    title: "Private commissions",
    text: "A guest book, a thesis, an album. You choose the size. We choose thread that will outlast the glue.",
  },
  {
    index: "04",
    title: "Bench workshops",
    text: "Four hours in the studio, or a kit for the kitchen table. You leave knowing one stitch.",
  },
];

export const benefits = [
  {
    title: "Sewn, not glued shut",
    text: "Signatures are sewn. A book that opens flat is the whole point of the bench.",
  },
  {
    title: "Paper with a name",
    text: "We tell you the sheet, the weight, and whether a fountain pen will feather.",
  },
  {
    title: "One person on the job",
    text: "The maker who starts your book answers when you write about it.",
  },
  {
    title: "Repairs you can see",
    text: "We photograph the damage and the decision. Nothing is prettied in secret.",
  },
];

export const homeBenefits = [
  {
    title: "A member card",
    text: "Sign in to commission a piece, hold a workshop seat, or follow a repair.",
  },
  {
    title: "Lead times in days",
    text: "Each piece lists how long the bench actually needs. We do not invent overnight binding.",
  },
  {
    title: "Pricing on the card",
    text: "Materials and making are in the price. Shipping is quoted before you commit.",
  },
  {
    title: "A desk that replies",
    text: "Questions about ink, size, or a broken hinge get a person, not a queue number.",
  },
  {
    title: "Small runs",
    text: "When a journal says four left, that is the cloth on the shelf, not a slogan.",
  },
  {
    title: "Books you already own",
    text: "Restoration is half the work. Bring the volume. We will say if it should be left alone.",
  },
];

export const steps = [
  {
    index: "01",
    title: "Choose a piece",
    text: "Filter by cloth, leather, paper, or how many days you can wait.",
  },
  {
    index: "02",
    title: "Reserve the bench",
    text: "Request the piece. A binder writes back with paper, initials, and the real date.",
  },
  {
    index: "03",
    title: "Collect or receive",
    text: "Pick it up at the studio or have it packed flat. Repairs include photos of the work.",
  },
];

export const testimonials = [
  {
    id: "priya",
    quote: "They rebound my grandmother’s copy without making it look new. The notes in the margin stayed put.",
    name: "Priya Natarajan",
    detail: "Family Book Repair",
    portrait: portraits.priya,
  },
  {
    id: "jonah",
    quote: "The daybook opens flat beside a keyboard. I have worn through cheaper ones in a season.",
    name: "Jonah Ellis",
    detail: "Linen Daybook",
    portrait: portraits.jonah,
  },
  {
    id: "amira",
    quote: "I asked for a guest book that did not look like a wedding catalog. This one looks like a tool.",
    name: "Amira Hassan",
    detail: "Vellum Guest Book",
    portrait: portraits.amira,
  },
  {
    id: "leo",
    quote: "Saturday Bench was four hours and one honest pamphlet. I finally understand a signature.",
    name: "Leo Martins",
    detail: "Saturday Bench",
    portrait: portraits.leo,
  },
  {
    id: "helena",
    quote: "The letter set is plain enough that the handwriting is the decoration. That was the request.",
    name: "Helena Vogt",
    detail: "Pressed Letter Set",
    portrait: portraits.helena,
  },
  {
    id: "marcus",
    quote: "They told me not to rebind a book that was fine. I trusted the studio more after that.",
    name: "Marcus Adeyemi",
    detail: "Restoration desk",
    portrait: portraits.marcus,
  },
];

export const stats = [
  { value: 28, label: "Years at this bench", decimals: 0 },
  { value: 6400, label: "Books made or mended", decimals: 0 },
  { value: 12, label: "Makers on staff", decimals: 0 },
  { value: 4.9, label: "Average rating", decimals: 1 },
];

export const faqs = [
  {
    question: "What does a Folio membership do?",
    answer:
      "It lets you commission a piece, save a workshop seat, and follow a repair from this browser. No fee is charged in this preview.",
  },
  {
    question: "Can you rebind a book I already own?",
    answer:
      "Yes. Bring it in or describe it. We repair structure first. If the book should be left alone, we will say so.",
  },
  {
    question: "How long does a journal take?",
    answer:
      "Each card lists a lead time in days. Leather and albums take longer than letter sets and kits. The date is when the bench can start, not a guess.",
  },
  {
    question: "Do you ship?",
    answer:
      "Finished journals and kits ship flat. Fragile repairs can be collected from the studio at 18 Quill Court. This demo does not take payment or print a label.",
  },
  {
    question: "What paper do you use?",
    answer:
      "Cotton and smooth writing sheets, named on the commission. Tell us if you use a fountain pen and we will avoid paper that feathers.",
  },
  {
    question: "Can I have a name stamped?",
    answer:
      "Yes, on journals, albums, and cloth cases. Initials are included. A long line is quoted before we set type.",
  },
  {
    question: "What happens when stock says zero?",
    answer:
      "That piece is waitlisted. Join the list and the desk writes when the next run is cut. Nothing is charged here.",
  },
  {
    question: "Are workshops for beginners?",
    answer:
      "Saturday Bench assumes you have not sewn a book. You get tools, paper, and a finished pamphlet. Kits include the same stitch on a card.",
  },
];

export const gallery = [
  { src: photo("1507842217343-583bb7270b66", 1400), alt: "Tall wooden shelves filled with books", caption: "The member shelves" },
  { src: photo("1524995997946-a1c2e315a42f", 1000), alt: "Stack of hardcover books on a table", caption: "Waiting for cases" },
  { src: photo("1517842645767-c639042777db", 1000), alt: "Open notebook and a pen on a desk", caption: "Paper desk" },
  { src: photo("1455390582262-044cdead277a", 1000), alt: "Typewriter on a wooden desk", caption: "Spine labels" },
  { src: photo("1495446815901-a7297e633e8d", 1000), alt: "Open book with printed pages", caption: "Open flat" },
  { src: photo("1519682337058-a94d519337bc", 1400), alt: "Person reading beside a window", caption: "Reading light" },
];

export const materials = [
  "Linen",
  "Bookcloth",
  "Bridle leather",
  "Cotton paper",
  "Linen thread",
  "Brass",
  "Marbled paper",
  "Board",
  "Foil",
  "Ribbon",
];

export const lookbook = {
  lead: {
    src: photo("1481627834876-b7833e8f5570", 1800),
    alt: "Open pages of a printed book",
    kicker: "On the bench",
    title: "A spine that opens, and stays open.",
  },
  side: [
    {
      src: photo("1512820790803-83ca734da794", 1200),
      alt: "Colorful book spines on a shelf",
      caption: "Cloth, in small runs",
    },
    {
      src: photo("1544816155-12df9643f363", 1200),
      alt: "Closed journal on a wooden surface",
      caption: "Leather, worn in on purpose",
    },
  ],
};

export function filterTrips(list, { query = "", category = "All", duration = "Any" } = {}) {
  const needle = query.trim().toLowerCase();
  return list.filter((trip) => {
    const haystack = `${trip.title} ${trip.region} ${trip.category} ${trip.blurb}`.toLowerCase();
    const matchesQuery = !needle || haystack.includes(needle);
    const matchesCategory = !category || category === "All" || trip.category === category;
    const matchesDuration =
      !duration ||
      duration === "Any" ||
      (duration === "short" && trip.days <= 10) ||
      (duration === "medium" && trip.days >= 11 && trip.days <= 20) ||
      (duration === "long" && trip.days >= 21);
    return matchesQuery && matchesCategory && matchesDuration;
  });
}
