import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LeadForm } from "@/components/sps/LeadForm";
import { Logo, PhoneLink, WhatsAppButton } from "@/components/sps/Shared";
import { ADDRESS, DEFAULT_HEADLINE, TOPICS, URL_TOPIC_TO_FORM, captureAttribution, headlineFor, noindexMeta } from "@/lib/sps";

const FAQS = [
  ["How long are the programmes?", "We offer half day, full day and 2 day formats, and can design longer programmes. [SPS to confirm available formats]"],
  ["Can you deliver at our office?", "Yes. We deliver in house at your office or at a venue in Dubai."],
  ["Do you offer Arabic delivery?", "Yes, programmes can be delivered in English or Arabic. [SPS to confirm topics available in Arabic]"],
  ["How many participants per session?", "Group size depends on the programme. [SPS to confirm recommended minimum and maximum]"],
  ["How soon can you start?", "We send a proposal within 2 business days. [SPS to confirm typical lead time to first session]"],
  ["Do you provide certificates of completion?", "[SPS to confirm whether certificates are issued and who issues them]"],
];

const PROGRAMMES = [
  { title: TOPICS[0], points: ["Lead and motivate teams with confidence", "Delegate, give feedback and coach", "Make decisions and manage priorities"] },
  { title: TOPICS[1], points: ["Understand customer needs and objections", "Build trust and close with structure", "Deliver consistent, standout service"] },
  { title: TOPICS[2], points: ["Communicate clearly in person and in writing", "Handle difficult conversations calmly", "Collaborate across teams and cultures"] },
  { title: TOPICS[3], points: ["Run a structured training needs analysis", "Design and deliver engaging sessions", "Measure training impact and report it"] },
];

const STEPS = [
  ["Training needs analysis", "We talk to your leaders and team to find the real skill gaps."],
  ["Programme design", "We build the content around your goals, roles and context."],
  ["Delivery", "Interactive sessions at your office or a Dubai venue, in English or Arabic."],
  ["Impact report", "You get a clear report on participation, feedback and results."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Corporate Training in Dubai | Solomon People Solutions" },
      { name: "description", content: "Tailored corporate training programmes for UAE companies: leadership, sales, communication and train the trainer, delivered in house in English or Arabic." },
      { property: "og:title", content: "Corporate Training in Dubai | Solomon People Solutions" },
      { property: "og:description", content: "Tailored in house corporate training programmes for UAE companies." },
      ...noindexMeta,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }),
      },
    ],
  }),
  component: Index,
});

function scrollToForm() {
  document.getElementById("proposal-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  const [headline, setHeadline] = useState(DEFAULT_HEADLINE);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    captureAttribution();
    const t = new URLSearchParams(window.location.search).get("topic");
    setHeadline(headlineFor(t));
    if (t && URL_TOPIC_TO_FORM[t.toLowerCase()]) setTopic(URL_TOPIC_TO_FORM[t.toLowerCase()]);
  }, []);

  const pick = (t: string) => {
    setTopic(t);
    scrollToForm();
  };

  return (
    <div className="bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <PhoneLink className="text-sm font-semibold text-foreground hover:text-primary" />
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-6 md:grid-cols-[1.1fr_1fr] md:pt-12">
        <div className="md:pt-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">In house corporate training · Dubai</p>
          <h1 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{headline}</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Programmes designed around your team's goals, delivered in house in English or Arabic, with a clear report on results.
          </p>
          <ul className="mt-7 space-y-3">
            {["Tailored to your company", "Half day, full day or 2 day formats", "Delivered at your office or a venue in Dubai"].map((c) => (
              <li key={c} className="flex items-center gap-3 font-medium">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-highlight/30 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <LeadForm topic={topic} />
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-card py-8" style={{ contentVisibility: "auto" }}>
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-destructive">PLACEHOLDER: replace with real client logos</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex h-14 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                Client logo {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="mx-auto max-w-6xl px-5 py-20" style={{ contentVisibility: "auto" }}>
        <h2 className="font-display text-3xl md:text-4xl">Programmes</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Every programme is adapted to your company, roles and goals.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PROGRAMMES.map((p) => (
            <article key={p.title} className="flex flex-col rounded-2xl border border-border bg-card p-7">
              <h3 className="font-display text-xl">{p.title}</h3>
              <ul className="mt-4 flex-1 space-y-2 text-muted-foreground">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    {pt}
                  </li>
                ))}
              </ul>
              <button onClick={() => pick(p.title)} className="mt-6 self-start rounded-full border-2 border-primary px-5 py-2 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
                Request a proposal
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card py-20" style={{ contentVisibility: "auto" }}>
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl md:text-4xl">How it works</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="rounded-2xl bg-background p-6">
                <span className="font-display text-3xl text-secondary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-5 py-20" style={{ contentVisibility: "auto" }}>
        <h2 className="font-display text-3xl md:text-4xl">Results</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <article key={i} className="rounded-2xl border border-dashed border-destructive/50 bg-card p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-destructive">PLACEHOLDER: real case study from SPS</p>
              <h3 className="mt-3 font-display text-xl">Case study {i}: industry and team</h3>
              <p className="mt-3 text-muted-foreground">Challenge, programme delivered and measured outcome go here.</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card py-20" style={{ contentVisibility: "auto" }}>
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-3xl md:text-4xl">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQS.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-foreground py-20 text-background">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Get a proposal for your team within 2 business days</h2>
          <button onClick={scrollToForm} className="mt-8 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground hover:bg-primary/90">
            Request my proposal
          </button>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl space-y-1 px-5 py-10 pb-24 text-sm text-muted-foreground md:pb-10">
        <p className="font-semibold text-foreground">Solomon People Solutions</p>
        <p>{ADDRESS}</p>
        <p><PhoneLink className="hover:text-primary" /></p>
        <p><a href="/privacy" className="underline hover:text-primary">Privacy policy</a></p>
      </footer>

      <WhatsAppButton floating />
    </div>
  );
}
