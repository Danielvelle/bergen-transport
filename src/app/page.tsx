"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Clock, Shield, Star, Users, ChevronRight, Menu, X, Minus, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState, useCallback } from "react";

const fade = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } } };
const stg = { visible: { transition: { staggerChildren: 0.06 } } };

/* ═══════════ TYPES ═══════════ */

interface AddOn { id: string; name: string; price: number; unit: string; }
interface BookingProduct { id: string; type: "journey" | "route"; title: string; subtitle?: string; basePrice: number; priceUnit: string; addOns: AddOn[]; }

/* ═══════════ BOOKING MODAL ═══════════ */

function BookingModal({ product, onClose }: { product: BookingProduct | null; onClose: () => void }) {
  const [guests, setGuests] = useState(2);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleAddOn = useCallback((id: string) => {
    setSelectedAddOns(prev => {
      const copy = { ...prev };
      if (copy[id]) { delete copy[id]; } else { copy[id] = guests; }
      return copy;
    });
  }, [guests]);

  if (!product) return null;

  const addOnTotal = product.addOns.reduce((sum, a) => sum + (selectedAddOns[a.id] || 0) * a.price, 0);
  const baseTotal = product.basePrice * (product.priceUnit === "per person" ? guests : 1);
  const total = baseTotal + addOnTotal;

  const handleSubmit = () => {
    if (!name || !email || !date) return;
    const subject = encodeURIComponent(`Booking request: ${product.title}`);
    const body = encodeURIComponent(
      `Booking Request\n\nJourney: ${product.title}\nGuests: ${guests}\nDate: ${date}\n\nAdd-ons:\n${product.addOns.filter(a => selectedAddOns[a.id]).map(a => `- ${a.name}: ${selectedAddOns[a.id]} × NOK ${a.price}`).join("\n") || "None"}\n\nEstimated total: NOK ${total.toLocaleString()}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nNotes: ${notes || "None"}`
    );
    window.location.href = `mailto:booking@bergenpremium.no?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-end" onClick={onClose}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-[520px] bg-[var(--background)] h-full overflow-y-auto shadow-2xl"
          onClick={e => e.stopPropagation()}>

          <div className="sticky top-0 z-10 bg-[var(--background)] border-b border-[var(--border)] px-8 py-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold tracking-[3px] uppercase text-[var(--muted-foreground)]">{product.type === "journey" ? "Journey" : "Transfer"} Request</span>
              <h3 className="text-[18px] font-bold text-[var(--foreground)] font-[family-name:var(--font-display)] mt-1">{product.title}</h3>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--secondary)] transition">
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center pt-20">
              <div className="w-16 h-16 rounded-full bg-[var(--secondary)] flex items-center justify-center mx-auto mb-6">
                <Star size={24} className="text-[var(--foreground)]" />
              </div>
              <h4 className="text-[20px] font-bold font-[family-name:var(--font-display)] mb-3">Request sent</h4>
              <p className="text-[14px] text-[var(--muted-foreground)] leading-[1.7]">Your email client should have opened. We typically respond within a few hours.</p>
              <button onClick={onClose} className="mt-8 text-[12px] tracking-[1.5px] uppercase font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">Close</button>
            </div>
          ) : (
            <div className="p-8 space-y-8">
              {/* Guests */}
              <div>
                <Label className="text-[10px] tracking-[2px] uppercase text-[var(--muted-foreground)] mb-3 block">Number of guests</Label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center hover:bg-[var(--secondary)] transition"><Minus size={16} /></button>
                  <span className="text-[24px] font-bold text-[var(--foreground)] w-12 text-center font-[family-name:var(--font-display)]">{guests}</span>
                  <button onClick={() => setGuests(Math.min(16, guests + 1))} className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center hover:bg-[var(--secondary)] transition"><Plus size={16} /></button>
                </div>
              </div>

              {/* Add-ons */}
              {product.addOns.length > 0 && (
                <div>
                  <Label className="text-[10px] tracking-[2px] uppercase text-[var(--muted-foreground)] mb-3 block">Optional add-ons</Label>
                  <div className="space-y-2">
                    {product.addOns.map(a => (
                      <button key={a.id} onClick={() => toggleAddOn(a.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition text-left ${selectedAddOns[a.id] ? "border-[var(--foreground)] bg-[var(--secondary)]" : "border-[var(--border)] hover:border-[var(--muted-foreground)]/40"}`}>
                        <div>
                          <span className="text-[14px] font-semibold text-[var(--foreground)] block">{a.name}</span>
                          <span className="text-[12px] text-[var(--muted-foreground)]">NOK {a.price} {a.unit}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${selectedAddOns[a.id] ? "border-[var(--foreground)] bg-[var(--foreground)]" : "border-[var(--border)]"}`}>
                          {selectedAddOns[a.id] && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Summary */}
              <div className="bg-[var(--secondary)] rounded-xl p-5">
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--muted-foreground)] block mb-3">Estimated total</span>
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">{product.title} × {product.priceUnit === "per person" ? `${guests} guests` : "1 transfer"}</span><span className="font-semibold">NOK {baseTotal.toLocaleString()}</span></div>
                  {product.addOns.filter(a => selectedAddOns[a.id]).map(a => (
                    <div key={a.id} className="flex justify-between"><span className="text-[var(--muted-foreground)]">{a.name} × {selectedAddOns[a.id]}</span><span className="font-semibold">NOK {(selectedAddOns[a.id] * a.price).toLocaleString()}</span></div>
                  ))}
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-[16px] font-bold"><span>Total</span><span>NOK {total.toLocaleString()}</span></div>
              </div>

              <Separator />

              {/* Contact details */}
              <div className="space-y-3">
                <Label className="text-[10px] tracking-[2px] uppercase text-[var(--muted-foreground)] block">Your details</Label>
                <Input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
                <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} />
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                <Textarea placeholder="Any special requests..." rows={3} value={notes} onChange={e => setNotes(e.target.value)} className="resize-y min-h-[80px]" />
              </div>

              <button onClick={handleSubmit}
                className="w-full bg-[var(--foreground)] text-[var(--background)] text-[12px] tracking-[1.5px] uppercase font-semibold py-4 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2">
                Send request <ArrowRight size={14} />
              </button>
              <p className="text-[11px] text-[var(--muted-foreground)] text-center">We respond within a few hours on business days.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════ NAV ═══════════ */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--background)]/80 backdrop-blur-2xl border-b border-[var(--border)]/60">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">
        <a href="#" className="font-[family-name:var(--font-display)] text-[15px] font-bold tracking-[4px] uppercase text-[var(--foreground)]">Bergen Premium</a>
        <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-[72px] inset-x-0 bg-[var(--background)]/98 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none p-6 md:p-0 gap-1 md:items-center border-b md:border-0 border-[var(--border)]`}>
          {[["Journeys", "#journeys"], ["Fleet", "#fleet"], ["Transfers", "#routes"], ["Enquiry", "#tours"]].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)} className="text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition px-4 py-2">{l}</a>
          ))}
          <a href="#journeys" onClick={() => setOpen(false)} className="md:ml-4 mt-3 md:mt-0 text-[11px] font-semibold tracking-[2px] uppercase bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-lg hover:opacity-90 transition text-center">
            Explore Journeys
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════ HERO ═══════════ */

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img src="/bergen-transport/hero-fjord.jpg" alt="Nærøyfjorden, Western Norway" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-12 pt-[180px] lg:pt-[220px] pb-16 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <motion.div initial="hidden" animate="visible" variants={stg} className="max-w-[620px]">
            <motion.div variants={fade} className="flex items-center gap-4 mb-10">
              <span className="w-12 h-[1px] bg-white/40" />
              <span className="text-[10px] font-semibold tracking-[5px] uppercase text-white/70">Bergen & Western Norway</span>
            </motion.div>
            <motion.h1 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(38px,5.5vw,70px)] font-bold leading-[0.97] tracking-[-1.5px] text-white mb-8">
              Scenic journeys and premium transport in Bergen.
            </motion.h1>
            <motion.p variants={fade} className="text-[17px] lg:text-[19px] font-light text-white/60 leading-[1.85] max-w-[460px] mb-12">
              Curated fjord day trips, private transfers, and tailored transport for visitors, cruise guests, and travel partners in Western Norway.
            </motion.p>
            <motion.div variants={fade} className="flex flex-wrap items-center gap-4">
              <a href="#journeys" className="inline-flex items-center gap-2 bg-white text-[#1A1915] text-[12px] tracking-[1.5px] uppercase font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition shadow-lg">
                Explore journeys <ArrowRight size={14} />
              </a>
              <a href="#routes" className="inline-flex items-center gap-2 border border-white/30 text-white text-[12px] tracking-[1.5px] uppercase font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition">
                Book a transfer
              </a>
            </motion.div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="border-t border-white/15 pt-7">
          <div className="flex flex-wrap gap-x-12 gap-y-3">
            {["Fjord day journeys", "Airport & hotel transfers", "20+ years in Bergen", "Trusted by hotels & cruise lines"].map((t, i) => (
              <span key={i} className="flex items-center gap-2 text-[11px] font-medium text-white/40 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-white/25" />{t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ JOURNEYS ═══════════ */

function Journeys({ onBook }: { onBook: (p: BookingProduct) => void }) {
  const journeys: (BookingProduct & { desc: string; duration: string; highlights: string[]; image: string })[] = [
    {
      id: "flam", type: "journey", title: "Flåm Fjord Day Journey", subtitle: "Bergen – Voss – Flåm – Bergen",
      basePrice: 2990, priceUnit: "per person",
      addOns: [
        { id: "cruise", name: "Fjord cruise Flåm–Gudvangen", price: 600, unit: "per person" },
        { id: "refreshments", name: "Light refreshments", price: 120, unit: "per guest" },
      ],
      desc: "A full-day journey from Bergen via Voss to Flåm. Scenic mountain roads, Tvinnefossen waterfall, and the famous Nærøyfjord.",
      duration: "Full day · ~10 hours",
      highlights: ["Voss", "Tvinnefossen", "Flåm", "Nærøyfjord area"],
      image: "/bergen-transport/journey-flam.jpg",
    },
    {
      id: "hardanger", type: "journey", title: "Hardanger Scenic Drive", subtitle: "Bergen – Hardangerfjord – Bergen",
      basePrice: 2490, priceUnit: "per person",
      addOns: [
        { id: "refreshments", name: "Light refreshments", price: 120, unit: "per guest" },
      ],
      desc: "A private drive through the Hardanger region. Fjord views, fruit orchards, mountain viewpoints, and quiet villages at your own pace.",
      duration: "Full day · ~8 hours",
      highlights: ["Hardangerfjord", "Steindalsfossen", "Fruit villages", "Mountain views"],
      image: "/bergen-transport/journey-hardanger.jpg",
    },
    {
      id: "bergen-city", type: "journey", title: "Bergen City Experience", subtitle: "Bryggen · Fløyen · Scenic Bergen",
      basePrice: 1690, priceUnit: "per person",
      addOns: [
        { id: "floyen", name: "Fløibanen funicular tickets", price: 150, unit: "per person" },
        { id: "refreshments", name: "Light refreshments", price: 120, unit: "per guest" },
      ],
      desc: "A private half-day tour of Bergen with a local chauffeur. Bryggen, Fløyen, scenic viewpoints, and the hidden corners only locals know.",
      duration: "Half day · ~4 hours",
      highlights: ["Bryggen", "Fløyen", "Local guidance", "Flexible route"],
      image: "/bergen-transport/journey-bergen.jpg",
    },
  ];

  return (
    <section id="journeys" className="py-28 lg:py-36 bg-[var(--secondary)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stg}>
          <motion.div variants={fade} className="flex items-center gap-4 mb-8">
            <span className="w-14 h-[1px] bg-[var(--border)]" />
            <span className="text-[10px] font-bold tracking-[5px] uppercase text-[var(--muted-foreground)]">Curated Journeys</span>
          </motion.div>
          <motion.h2 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] font-bold tracking-[-1px] text-[var(--foreground)] mb-4">
            Private day journeys from Bergen.
          </motion.h2>
          <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] mb-14 max-w-[500px] leading-[1.8]">
            Handpicked routes through the fjords, mountains, and villages of Western Norway. For individuals, couples, families, cruise guests, and small groups.
          </motion.p>

          <div className="grid lg:grid-cols-3 gap-4">
            {journeys.map((j, i) => (
              <motion.div key={i} variants={fade}>
                <Card className="overflow-hidden border-[var(--border)]/80 bg-[var(--card)] hover:shadow-lg transition-all group h-full flex flex-col">
                  <div className="h-[200px] relative overflow-hidden">
                    <img src={j.image} alt={j.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 z-10">
                      <span className="text-[10px] font-semibold tracking-[2px] uppercase text-white/80">{j.duration}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-[18px] font-bold text-[var(--foreground)] mb-1 font-[family-name:var(--font-display)]">{j.title}</h3>
                    {j.subtitle && <span className="text-[12px] text-[var(--muted-foreground)] mb-3">{j.subtitle}</span>}
                    <p className="text-[13px] text-[var(--muted-foreground)] leading-[1.8] mb-4">{j.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {j.highlights.map((h, hi) => (
                        <span key={hi} className="text-[10px] font-medium text-[var(--muted-foreground)]/70 bg-[var(--secondary)] px-2.5 py-1 rounded-md">{h}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-[var(--border)]/60 flex items-end justify-between">
                      <div>
                        <span className="text-[20px] font-bold text-[var(--foreground)]">NOK {j.basePrice.toLocaleString()}</span>
                        <span className="text-[12px] text-[var(--muted-foreground)] ml-1.5">per person</span>
                      </div>
                      <button onClick={() => onBook(j)} className="inline-flex items-center gap-1.5 text-[11px] tracking-[1px] uppercase font-semibold bg-[var(--foreground)] text-[var(--background)] px-5 py-2.5 rounded-lg hover:opacity-90 transition">
                        Request <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ FLEET ═══════════ */

function Fleet() {
  const vehicles = [
    { category: "Premium Minibus", name: "Premium Minibus", desc: "Ideal for families, tour groups, and corporate guests. Comfortable seating for up to 16.", seats: "8–16 passengers" },
    { category: "Luxury Electric", name: "Mercedes EQV", desc: "Spacious, fully electric, whisper-quiet. Perfect for airport transfers, hotel pickups, and sightseeing.", seats: "Up to 7 passengers" },
    { category: "Executive Sedan", name: "Mercedes EQS", desc: "Our flagship for private transfers. The highest level of comfort for guests who value elegance.", seats: "Up to 3 passengers" },
    { category: "Performance", name: "Porsche Taycan", desc: "For the guest who wants something memorable. A scenic fjord drive in a Taycan is an experience in itself.", seats: "Up to 3 passengers" },
    { category: "Standard", name: "Taxi", desc: "Professional, comfortable, punctual. Licensed Bergen taxis for shorter distances and everyday needs.", seats: "Up to 4 passengers" },
  ];

  return (
    <section id="fleet" className="py-28 lg:py-36 bg-[var(--background)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stg}>
          <motion.div variants={fade} className="flex items-center gap-4 mb-8">
            <span className="w-14 h-[1px] bg-[var(--border)]" />
            <span className="text-[10px] font-bold tracking-[5px] uppercase text-[var(--muted-foreground)]">Our Fleet</span>
          </motion.div>
          <motion.h2 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] font-bold tracking-[-1px] text-[var(--foreground)] mb-4">
            The right vehicle for every guest.
          </motion.h2>
          <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] mb-14 max-w-[460px] leading-[1.8]">
            Solo travellers, families, tour groups, or VIP guests. Every vehicle is driven by a professional local chauffeur.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((v, i) => (
              <motion.div key={i} variants={fade}>
                <Card className="p-7 border-[var(--border)]/80 hover:shadow-md transition-all group">
                  <span className="text-[10px] font-bold tracking-[3px] uppercase text-[var(--muted-foreground)]/60 mb-3 block">{v.category}</span>
                  <h3 className="text-[20px] font-bold text-[var(--foreground)] mb-2 group-hover:opacity-80 transition font-[family-name:var(--font-display)]">{v.name}</h3>
                  <p className="text-[13px] text-[var(--muted-foreground)] leading-[1.8] mb-4">{v.desc}</p>
                  <span className="flex items-center gap-1.5 text-[12px] text-[var(--muted-foreground)]"><Users size={13} /> {v.seats}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ ROUTES ═══════════ */

function Routes({ onBook }: { onBook: (p: BookingProduct) => void }) {
  const [showAll, setShowAll] = useState(false);
  const routes: (BookingProduct & { from: string; to: string; time: string })[] = [
    { id: "apt-hotel", type: "route", title: "Airport → Hotel", from: "Bergen Airport (BGO)", to: "Your hotel in Bergen", time: "~30 min", basePrice: 890, priceUnit: "per transfer", addOns: [] },
    { id: "hotel-apt", type: "route", title: "Hotel → Airport", from: "Your hotel in Bergen", to: "Bergen Airport (BGO)", time: "~30 min", basePrice: 890, priceUnit: "per transfer", addOns: [] },
    { id: "cruise", type: "route", title: "Cruise Terminal", from: "Bergen Cruise Terminal", to: "Hotel or city centre", time: "~10–20 min", basePrice: 590, priceUnit: "per transfer", addOns: [] },
    { id: "apt-private", type: "route", title: "Airport → Accommodation", from: "Bergen Airport (BGO)", to: "Private accommodation", time: "~25–40 min", basePrice: 950, priceUnit: "per transfer", addOns: [] },
    { id: "hardanger-rt", type: "route", title: "Bergen → Hardanger", from: "Bergen", to: "Hardanger / Voss", time: "~1.5–2 hrs", basePrice: 3900, priceUnit: "per transfer", addOns: [] },
    { id: "flam-rt", type: "route", title: "Bergen → Flåm", from: "Bergen", to: "Flåm / Sognefjorden", time: "~2.5–3 hrs", basePrice: 5900, priceUnit: "per transfer", addOns: [] },
  ];
  const visible = showAll ? routes : routes.slice(0, 3);

  return (
    <section id="routes" className="py-28 lg:py-36 bg-[var(--secondary)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stg}>
          <motion.div variants={fade} className="flex items-center gap-4 mb-8">
            <span className="w-14 h-[1px] bg-[var(--border)]" />
            <span className="text-[10px] font-bold tracking-[5px] uppercase text-[var(--muted-foreground)]">Fixed Transfers</span>
          </motion.div>
          <motion.h2 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] font-bold tracking-[-1px] text-[var(--foreground)] mb-4">
            Airport and hotel transfers.
          </motion.h2>
          <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] mb-14 max-w-[460px] leading-[1.8]">
            Fixed pricing. Your chauffeur meets you at arrival.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-4">
            {visible.map((r, i) => (
              <motion.div key={r.id} variants={fade} initial={showAll && i >= 3 ? { opacity: 0, y: 12 } : undefined} animate={showAll && i >= 3 ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.4, delay: Math.max(0, i - 3) * 0.06 }}>
                <Card className="p-6 hover:shadow-md transition-all group border-[var(--border)]/80 bg-[var(--card)] h-full flex flex-col">
                  <div className="mb-3">
                    <span className="text-[10px] font-semibold text-[var(--muted-foreground)] tracking-[2px] uppercase">From</span>
                    <p className="text-[15px] font-semibold text-[var(--foreground)] mt-1">{r.from}</p>
                  </div>
                  <div className="mb-4">
                    <span className="text-[10px] font-semibold text-[var(--muted-foreground)] tracking-[2px] uppercase">To</span>
                    <p className="text-[15px] font-semibold text-[var(--foreground)] mt-1">{r.to}</p>
                  </div>
                  <Separator className="mb-4" />
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[13px] text-[var(--muted-foreground)]">{r.time}</span>
                    <span className="text-[15px] font-bold text-[var(--foreground)]">NOK {r.basePrice.toLocaleString()}</span>
                  </div>
                  <button onClick={() => onBook(r)} className="flex items-center justify-center gap-1 w-full bg-[var(--foreground)] text-[var(--background)] text-[11px] tracking-[1px] uppercase font-semibold py-3 rounded-lg hover:opacity-90 transition mt-auto">
                    Book this transfer <ChevronRight size={14} />
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>

          {!showAll && (
            <motion.div variants={fade} className="text-center mt-10">
              <button onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 text-[12px] tracking-[1.5px] uppercase font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition border border-[var(--border)] px-8 py-3.5 rounded-xl hover:bg-[var(--card)]">
                Show more routes <ChevronRight size={14} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ ENQUIRY ═══════════ */

function Enquiry() {
  return (
    <section id="tours" className="py-28 lg:py-36 bg-[var(--foreground)] text-[var(--background)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stg}
          className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">
          <div>
            <motion.div variants={fade} className="flex items-center gap-4 mb-8">
              <span className="w-14 h-[1px] bg-white/20" />
              <span className="text-[10px] font-bold tracking-[5px] uppercase text-white/40">Custom Enquiry</span>
            </motion.div>
            <motion.h2 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] font-bold tracking-[-1px] text-white mb-6">
              Planning something tailored?
            </motion.h2>
            <motion.p variants={fade} className="text-[16px] font-light text-white/50 leading-[1.9] mb-10">
              Multi-day tours, cruise shore excursions, corporate hosting, or a custom itinerary. Tell us what you need and we will propose the best solution.
            </motion.p>
            <motion.div variants={stg} className="space-y-5">
              {[
                { icon: <MapPin size={16} />, t: "Custom sightseeing", d: "Fjords, mountains, villages — tailored to your group" },
                { icon: <Users size={16} />, t: "Cruise & group transport", d: "Shore excursions, conference shuttles, family groups" },
                { icon: <Star size={16} />, t: "Travel industry partners", d: "Hotels, concierges, DMCs, tour operators" },
              ].map((item, i) => (
                <motion.div key={i} variants={fade} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 shrink-0">{item.icon}</div>
                  <div>
                    <span className="block text-[14px] font-semibold text-white mb-1">{item.t}</span>
                    <span className="text-[13px] text-white/40">{item.d}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fade}>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8">
              <h3 className="text-[18px] font-semibold text-white mb-6">Send us your request</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div><Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Name</Label><Input placeholder="Full name" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" /></div>
                <div><Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Email</Label><Input type="email" placeholder="you@email.com" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div><Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Phone</Label><Input placeholder="+47" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" /></div>
                <div><Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Date / period</Label><Input type="date" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" /></div>
              </div>
              <div className="mb-4">
                <Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Guests</Label>
                <Input placeholder="e.g. 4" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" />
              </div>
              <div className="mb-6">
                <Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Describe your trip</Label>
                <Textarea placeholder="Destination, dates, group size, special requests..." rows={4} className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 resize-y min-h-[100px]" />
              </div>
              <button className="w-full bg-white text-[var(--foreground)] hover:bg-white/90 text-[12px] tracking-[1px] uppercase font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2">
                Send enquiry <ArrowRight size={14} />
              </button>
              <p className="text-[11px] text-white/25 text-center mt-3">We typically respond within a few hours.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ TRUST ═══════════ */

function Trust() {
  return (
    <section className="py-28 lg:py-36 bg-[var(--background)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stg}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-32 items-start">
          <div>
            <motion.div variants={fade} className="flex items-center gap-4 mb-8">
              <span className="w-14 h-[1px] bg-[var(--border)]" />
              <span className="text-[10px] font-bold tracking-[5px] uppercase text-[var(--muted-foreground)]">Why Bergen Premium</span>
            </motion.div>
            <motion.h2 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] font-bold tracking-[-1px] text-[var(--foreground)] mb-8">
              Two decades of welcoming guests.
            </motion.h2>
            <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] leading-[1.9] mb-4">
              Since 2004, we have transported visitors, cruise guests, and business travellers across Bergen and Western Norway. Our chauffeurs know every fjord road, hotel entrance, and flight schedule.
            </motion.p>
            <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] leading-[1.9]">
              Hotels, cruise operators, DMCs, and corporate clients trust us because we deliver the same standard every time.
            </motion.p>
          </div>
          <motion.div variants={stg} className="lg:border-l lg:border-[var(--border)] lg:pl-14 lg:pt-2">
            {[
              { icon: <Shield size={18} />, t: "20+ years in Bergen", d: "One of the most experienced premium transport operators in the region." },
              { icon: <Star size={18} />, t: "Premium fleet", d: "Mercedes EQS, EQV, Porsche Taycan, and premium minibuses." },
              { icon: <Users size={18} />, t: "Trusted by the tourism industry", d: "Hotels, cruise lines, DMCs, and concierge services recommend us." },
              { icon: <Clock size={18} />, t: "Flight-tracked pickups", d: "We monitor your flight and adjust for delays. You never wait." },
            ].map((p, i) => (
              <motion.div key={i} variants={fade} className="py-7 border-b border-[var(--border)]/60 last:border-0 group">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)]/60 group-hover:text-[var(--foreground)] transition shrink-0">{p.icon}</div>
                  <div>
                    <strong className="block text-[15px] font-semibold text-[var(--foreground)] mb-1">{p.t}</strong>
                    <span className="text-[13px] text-[var(--muted-foreground)] leading-[1.7]">{p.d}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ FOOTER ═══════════ */

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] pt-16 pb-10">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div>
            <div className="text-[13px] font-bold tracking-[5px] uppercase text-[var(--foreground)] mb-4">Bergen Premium</div>
            <p className="text-[13px] text-[var(--muted-foreground)] leading-[1.9]">Premium tourist transport<br />in Bergen, Norway.<br />Since 2004.</p>
          </div>
          <div>
            <h4 className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--muted-foreground)]/60 mb-5">Services</h4>
            <div className="flex flex-col gap-3">
              {["Fjord day journeys", "Airport transfers", "Hotel transfers", "Cruise guest transport", "Corporate transport"].map(l => (
                <a key={l} href="#journeys" className="text-[13px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--muted-foreground)]/60 mb-5">Fleet</h4>
            <div className="flex flex-col gap-3">
              {["Mercedes EQS", "Mercedes EQV", "Porsche Taycan", "Premium minibus", "Standard taxi"].map(l => (
                <a key={l} href="#fleet" className="text-[13px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--muted-foreground)]/60 mb-5">Contact</h4>
            <div className="flex flex-col gap-3 text-[13px] text-[var(--muted-foreground)]">
              <a href="tel:+4700000000" className="hover:text-[var(--foreground)] transition flex items-center gap-2"><Phone size={13} /> +47 000 00 000</a>
              <a href="mailto:booking@bergenpremium.no" className="hover:text-[var(--foreground)] transition flex items-center gap-2"><Mail size={13} /> booking@bergenpremium.no</a>
              <span className="flex items-center gap-2"><MapPin size={13} /> Bergen, Norway</span>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--border)]/60 text-center">
          <span className="text-[11px] text-[var(--muted-foreground)]/50">&copy; 2026 Bergen Premium Transport. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════ PAGE ═══════════ */

export default function Home() {
  const [bookingProduct, setBookingProduct] = useState<BookingProduct | null>(null);

  return (
    <>
      <Nav />
      <Hero />
      <Journeys onBook={setBookingProduct} />
      <Fleet />
      <Routes onBook={setBookingProduct} />
      <Enquiry />
      <Trust />
      <Footer />
      {bookingProduct && <BookingModal product={bookingProduct} onClose={() => setBookingProduct(null)} />}
    </>
  );
}
