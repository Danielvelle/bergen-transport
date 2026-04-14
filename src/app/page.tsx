"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Clock, Shield, Star, Users, Car, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const fade = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } } };
const stg = { visible: { transition: { staggerChildren: 0.06 } } };

/* ═══════════ NAV ═══════════ */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--background)]/80 backdrop-blur-2xl border-b border-[var(--border)]/60">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">
        <a href="#" className="font-[var(--font-display)] text-[15px] font-bold tracking-[4px] uppercase text-[var(--foreground)]">
          Bergen Premium
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-[72px] inset-x-0 bg-[var(--background)]/98 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none p-6 md:p-0 gap-1 md:items-center border-b md:border-0 border-[var(--border)]`}>
          {[["Routes", "#routes"], ["Fleet", "#fleet"], ["Custom Tours", "#tours"], ["About", "#about"]].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)} className="text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition px-4 py-2">{l}</a>
          ))}
          <a href="#routes" onClick={() => setOpen(false)} className="md:ml-4 mt-3 md:mt-0 text-[11px] font-semibold tracking-[2px] uppercase bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-lg hover:opacity-90 transition text-center">
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════ HERO ═══════════ */

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-[var(--background)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(168,164,154,0.08)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-12 pt-[180px] lg:pt-[220px] pb-20 w-full">
        <motion.div initial="hidden" animate="visible" variants={stg} className="max-w-[720px]">
          <motion.div variants={fade} className="flex items-center gap-4 mb-12">
            <span className="w-12 h-[1px] bg-[var(--muted-foreground)]/40" />
            <span className="text-[10px] font-semibold tracking-[5px] uppercase text-[var(--muted-foreground)]">Bergen, Norway</span>
          </motion.div>

          <motion.h1 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(42px,6.5vw,80px)] font-bold leading-[0.95] tracking-[-2px] text-[var(--foreground)] mb-8">
            Private transport,{" "}
            <span className="italic">elevated.</span>
          </motion.h1>

          <motion.p variants={fade} className="text-[18px] lg:text-[20px] font-light text-[var(--muted-foreground)] leading-[1.8] max-w-[480px] mb-12">
            Airport transfers, fixed routes, and custom tours in Bergen. Premium vehicles, professional chauffeurs, and over 20 years of experience.
          </motion.p>

          <motion.div variants={fade} className="flex flex-wrap items-center gap-4">
            <a href="#routes" className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] text-[12px] tracking-[1.5px] uppercase font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition">
              Book a fixed route <ArrowRight size={14} />
            </a>
            <a href="#tours" className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--foreground)] text-[12px] tracking-[1.5px] uppercase font-semibold px-8 py-4 rounded-xl hover:bg-[var(--secondary)] transition">
              Request custom trip
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-[var(--border)]/60">
          <div className="flex flex-wrap gap-x-12 gap-y-3">
            {["20+ years of experience", "Professional chauffeurs", "Premium fleet", "Bergen specialists"].map((t, i) => (
              <span key={i} className="flex items-center gap-2 text-[11px] font-medium text-[var(--muted-foreground)]/60 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted-foreground)]/30" />{t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ ROUTES ═══════════ */

function Routes() {
  const routes = [
    { from: "Bergen Airport (BGO)", to: "Bergen City Centre", time: "~30 min", price: "From NOK 890" },
    { from: "Bergen City Centre", to: "Bergen Airport (BGO)", time: "~30 min", price: "From NOK 890" },
    { from: "Bergen Airport (BGO)", to: "Hotel / Accommodation", time: "~25–40 min", price: "From NOK 950" },
    { from: "Bergen Cruise Terminal", to: "Bergen City / Hotel", time: "~10–20 min", price: "From NOK 590" },
    { from: "Bergen", to: "Hardanger / Voss", time: "~1.5–2 hrs", price: "From NOK 3 900" },
    { from: "Bergen", to: "Flåm / Sognefjorden", time: "~2.5–3 hrs", price: "From NOK 5 900" },
  ];

  return (
    <section id="routes" className="py-28 lg:py-36 bg-[var(--secondary)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stg}>
          <motion.div variants={fade} className="flex items-center gap-4 mb-8">
            <span className="w-14 h-[1px] bg-[var(--border)]" />
            <span className="text-[10px] font-bold tracking-[5px] uppercase text-[var(--muted-foreground)]">Fixed Routes</span>
          </motion.div>
          <motion.h2 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] font-bold tracking-[-1px] text-[var(--foreground)] mb-4">
            Book your transfer.
          </motion.h2>
          <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] mb-14 max-w-[440px] leading-[1.8]">
            Select a route below. Fixed pricing, no surprises. Your chauffeur meets you at arrival.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((r, i) => (
              <motion.div key={i} variants={fade}>
                <Card className="p-6 hover:shadow-md transition-all group border-[var(--border)]/80 bg-[var(--card)]">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-[var(--muted-foreground)] tracking-wide uppercase">From</span>
                      <p className="text-[15px] font-semibold text-[var(--foreground)] mt-1">{r.from}</p>
                    </div>
                    <div className="mb-5">
                      <span className="text-[11px] font-semibold text-[var(--muted-foreground)] tracking-wide uppercase">To</span>
                      <p className="text-[15px] font-semibold text-[var(--foreground)] mt-1">{r.to}</p>
                    </div>
                    <Separator className="mb-4" />
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[13px] text-[var(--muted-foreground)]">{r.time}</span>
                      <span className="text-[15px] font-bold text-[var(--foreground)]">{r.price}</span>
                    </div>
                    <a href="#tours" className="flex items-center justify-center gap-1 w-full bg-[var(--foreground)] text-[var(--background)] text-[11px] tracking-[1px] uppercase font-semibold py-3 rounded-lg hover:opacity-90 transition">
                      Book this route <ChevronRight size={14} />
                    </a>
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
    { category: "Premium Minibus", name: "5 vehicles", desc: "Groups of up to 16 passengers. Ideal for tours, events, and corporate transfers.", seats: "8–16" },
    { category: "Luxury Electric", name: "Mercedes EQV", desc: "Fully electric luxury van. Whisper-quiet, spacious, premium interior.", seats: "Up to 7", count: "3 available" },
    { category: "Executive Sedan", name: "Mercedes EQS", desc: "Flagship electric sedan. The highest level of comfort for private transfers.", seats: "Up to 3", count: "2 available" },
    { category: "Performance", name: "Porsche Taycan", desc: "For the guest who appreciates precision engineering and presence.", seats: "Up to 3", count: "1 available" },
    { category: "Standard", name: "Taxi fleet", desc: "Professional, comfortable, and punctual. Licensed taxis for everyday transport.", seats: "Up to 4" },
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
            The right vehicle for every occasion.
          </motion.h2>
          <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] mb-14 max-w-[460px] leading-[1.8]">
            From executive sedans to premium minibuses. Every vehicle is maintained to the highest standard.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((v, i) => (
              <motion.div key={i} variants={fade}>
                <Card className={`p-7 border-[var(--border)]/80 hover:shadow-md transition-all group ${i === 0 ? "lg:col-span-1 md:col-span-2 lg:row-span-1" : ""}`}>
                  <span className="text-[10px] font-bold tracking-[3px] uppercase text-[var(--muted-foreground)]/60 mb-3 block">{v.category}</span>
                  <h3 className="text-[20px] font-bold text-[var(--foreground)] mb-2 group-hover:opacity-80 transition font-[family-name:var(--font-display)]">{v.name}</h3>
                  <p className="text-[13px] text-[var(--muted-foreground)] leading-[1.8] mb-4">{v.desc}</p>
                  <div className="flex items-center gap-4 text-[12px] text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1.5"><Users size={13} /> {v.seats}</span>
                    {v.count && <span className="flex items-center gap-1.5"><Car size={13} /> {v.count}</span>}
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

/* ═══════════ CUSTOM TOURS ═══════════ */

function Tours() {
  return (
    <section id="tours" className="py-28 lg:py-36 bg-[var(--foreground)] text-[var(--background)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stg}
          className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">
          <div>
            <motion.div variants={fade} className="flex items-center gap-4 mb-8">
              <span className="w-14 h-[1px] bg-white/20" />
              <span className="text-[10px] font-bold tracking-[5px] uppercase text-white/40">Custom Tours & Enquiries</span>
            </motion.div>
            <motion.h2 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] font-bold tracking-[-1px] text-white mb-6">
              Tell us where you want to go.
            </motion.h2>
            <motion.p variants={fade} className="text-[16px] font-light text-white/50 leading-[1.9] mb-10">
              Private day trips, multi-day tours, corporate transport, or anything in between. Describe what you need and we will propose the best solution.
            </motion.p>

            <motion.div variants={stg} className="space-y-5">
              {[
                { icon: <MapPin size={16} />, t: "Day trips from Bergen", d: "Hardanger, Flåm, Sognefjorden, Rosendal, Voss" },
                { icon: <Users size={16} />, t: "Corporate & group transport", d: "Conferences, events, team travel" },
                { icon: <Star size={16} />, t: "Concierge & travel partners", d: "We work with hotels, DMCs, and tour operators" },
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
              <h3 className="text-[18px] font-semibold text-white mb-6">Send an enquiry</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div><Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Name</Label><Input placeholder="Full name" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" /></div>
                <div><Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Email</Label><Input type="email" placeholder="you@email.com" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div><Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Phone</Label><Input placeholder="+47" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" /></div>
                <div><Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Date</Label><Input type="date" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" /></div>
              </div>
              <div className="mb-4">
                <Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Number of passengers</Label>
                <Input placeholder="e.g. 4" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" />
              </div>
              <div className="mb-6">
                <Label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">Describe your trip</Label>
                <Textarea placeholder="Where would you like to go, how long, any special requests..." rows={4} className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 resize-y min-h-[100px]" />
              </div>
              <button className="w-full bg-white text-[var(--foreground)] hover:bg-white/90 text-[12px] tracking-[1px] uppercase font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2">
                Send enquiry <ArrowRight size={14} />
              </button>
              <p className="text-[11px] text-white/25 text-center mt-3">We typically respond within a few hours on business days.</p>
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
    <section id="about" className="py-28 lg:py-36 bg-[var(--secondary)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stg}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-32 items-start">
          <div>
            <motion.div variants={fade} className="flex items-center gap-4 mb-8">
              <span className="w-14 h-[1px] bg-[var(--border)]" />
              <span className="text-[10px] font-bold tracking-[5px] uppercase text-[var(--muted-foreground)]">Why Bergen Premium</span>
            </motion.div>
            <motion.h2 variants={fade} className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] font-bold tracking-[-1px] text-[var(--foreground)] mb-8">
              Two decades of getting it right.
            </motion.h2>
            <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] leading-[1.9] mb-4">
              We have been operating premium transport in Bergen since 2004. Our drivers know every road, every hotel entrance, and every flight schedule. When you book with us, you are booking reliability.
            </motion.p>
            <motion.p variants={fade} className="text-[16px] font-light text-[var(--muted-foreground)] leading-[1.9]">
              We work with leading hotels, travel agencies, and corporate clients across Western Norway. Whether it is one airport transfer or a week-long tour — the standard is the same.
            </motion.p>
          </div>

          <motion.div variants={stg} className="lg:border-l lg:border-[var(--border)] lg:pl-14 lg:pt-2">
            {[
              { icon: <Shield size={18} />, t: "20+ years in Bergen", d: "Established operator with deep local expertise." },
              { icon: <Star size={18} />, t: "Premium fleet only", d: "Mercedes EQS, EQV, Porsche Taycan, and premium minibuses." },
              { icon: <Users size={18} />, t: "Trusted by travel professionals", d: "Hotels, DMCs, and concierge services recommend us." },
              { icon: <Clock size={18} />, t: "Always on time", d: "We track every flight and adjust for delays. You never wait." },
            ].map((p, i) => (
              <motion.div key={i} variants={fade} className="py-7 border-b border-[var(--border)]/60 last:border-0 group">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)]/60 group-hover:text-[var(--foreground)] transition shrink-0">{p.icon}</div>
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
            <p className="text-[13px] text-[var(--muted-foreground)] leading-[1.9]">Premium private transport<br />in Bergen, Norway.<br />Since 2004.</p>
          </div>
          <div>
            <h4 className="text-[9px] font-bold tracking-[4px] uppercase text-[var(--muted-foreground)]/60 mb-5">Services</h4>
            <div className="flex flex-col gap-3">
              {["Airport transfers", "Fixed routes", "Custom day trips", "Corporate transport", "Group travel"].map(l => (
                <a key={l} href="#routes" className="text-[13px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">{l}</a>
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
  return (
    <>
      <Nav />
      <Hero />
      <Routes />
      <Fleet />
      <Tours />
      <Trust />
      <Footer />
    </>
  );
}
