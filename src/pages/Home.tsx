import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Plane, Briefcase, FileCheck, Landmark, ArrowRight, ShieldCheck, UserCheck, Globe, Star, MapPin, Phone, Mail, ChevronRight, Search, MessageSquare, Zap, Facebook, Instagram, Twitter, Menu, X, Play, Calendar } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Reveal } from '@/components/Reveal';
import SEO from '@/components/SEO';
import { organizationSchema, localBusinessSchema, faqSchema } from '@/lib/structuredData';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ContactForm } from '@/components/ContactForm';
import { useCta } from '@/components/CtaModal';
import { getLatestTestimonials, getLatestPosts } from '@/lib/sanity';
import parisImg from '@assets/generated_images/paris.webp';
import dubaiImg from '@assets/generated_images/dubai.webp';
import londonImg from '@assets/generated_images/london.webp';
import torontoImg from '@assets/generated_images/toronto.webp';
import nycImg from '@assets/generated_images/nyc.webp';
import amsterdamImg from '@assets/generated_images/amsterdam.webp';

import serviceTravelImg from '@assets/generated_images/service-travel.webp';
import serviceJobsImg from '@assets/generated_images/service-jobs.webp';
import serviceVisaImg from '@assets/generated_images/service-visa.webp';
import servicePassportImg from '@assets/generated_images/service-passport.webp';

export default function Home() {
  const { open: openCta } = useCta();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);
  const [playVideo, setPlayVideo] = React.useState(true);
  const [featuredTestimonials, setFeaturedTestimonials] = React.useState<any[]>([]);

  const [latestPosts, setLatestPosts] = React.useState<any[]>([]);
  const [postsLoading, setPostsLoading] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    getLatestTestimonials(4).then(setFeaturedTestimonials);
    getLatestPosts(3).then(posts => {
      setLatestPosts(posts)
      setPostsLoading(false)
    })
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPlayVideo(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const faqItems = [
    { q: "How long does visa processing take?", a: "Processing times vary significantly based on the destination country, visa type, and current embassy backlogs. On average, tourist visas take 2-4 weeks, while work and student visas can take 1-3 months. We provide accurate timelines during consultation." },
    { q: "What documents do I need for a visa application?", a: "Standard requirements include a valid passport (6 months validity), passport-sized photos, proof of funds, travel itinerary, and accommodation details. Specific visas require additional documents like employment letters, admission letters, or police clearance. We provide a customized checklist." },
    { q: "Do you offer travel packages?", a: "Yes, we curate premium travel packages including flights, luxury hotel reservations, airport transfers, and customized tours for major global destinations." },
    { q: "How much does it cost?", a: "Our service fees depend on the complexity of the application and the service requested. We operate with complete transparency-all fees are discussed upfront during your initial consultation with no hidden charges." },
    { q: "Can you help with passport renewal?", a: "Absolutely. We offer expedited assistance for new passport acquisition, renewals, and other vital documents like biometric birth certificates to ensure you're travel-ready." },
    { q: "What countries do you cover for recruitment?", a: "Our primary recruitment corridors are Canada, the United States, Germany, Serbia, and the Gulf Countries, focusing on healthcare, IT, engineering, and hospitality sectors." },
    { q: "How do I get started?", a: "Simply fill out the contact form below or call our office to schedule your initial consultation. We'll assess your profile and map out the exact steps required." },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Home"
        description="CS Franddos Limited — travel, visa, immigration, and passport services based in Ashiaman, Ghana. Unlocking borders and building global careers."
        path="/"
        jsonLd={[organizationSchema, localBusinessSchema, faqSchema(faqItems)]}
      />

      {/* PAGE GUIDE LINES */}
      <div className="pointer-events-none fixed inset-0 z-[999] mix-blend-difference" aria-hidden="true">
        <div className="absolute inset-y-0 left-[calc(7.5vw-12px)] w-px bg-accent opacity-20" />
        <div className="absolute inset-y-0 right-[calc(7.5vw-12px)] w-px bg-accent opacity-20" />
      </div>

      {/* 0. TOP INFO BAR */}
      <div
        className="fixed top-0 z-[60] bg-accent text-white/80 text-[11px] font-medium h-9 rounded-b-[4px]"
        style={{ left: 'calc(7.5vw)', right: 'calc(7.5vw)' }}
      >
        <div className="w-full h-full px-5 flex items-center justify-between gap-4">

          {/* Left - registration numbers */}
          <div className="hidden sm:flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="text-secondary font-semibold tracking-wide uppercase text-[9px]">Reg. No.</span>
              <span className="text-white/70">GH-REG-000000</span>
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <span className="text-secondary font-semibold tracking-wide uppercase text-[9px]">Recruit. Lic.</span>
              <span className="text-white/70">GHA-LIC-000000</span>
            </span>
          </div>

          {/* Right - phone numbers */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="tel:+233247789031"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              <Phone size={11} className="text-secondary shrink-0" />
              <span>024 778 9031</span>
            </a>
            <span className="w-px h-3 bg-white/20" />
            <a
              href="tel:+233247789031"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              <Phone size={11} className="text-secondary shrink-0" />
              <span>024 203 5562</span>
            </a>
          </div>

        </div>
      </div>

      {/* 1. NAVIGATION */}
      <header className="fixed top-11 left-0 right-0 z-50 flex justify-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className={`w-full rounded-[4px] border backdrop-blur-md px-5 py-2.5 flex items-center justify-between gap-4 transition-all duration-500 ${isScrolled
            ? 'bg-white/20 shadow-lg border-white/20'
            : 'bg-white/5 border-white/10'
            }`}>

            {/* Logo - left */}
            <Link href="/" className="flex items-center shrink-0 gap-2.5">
              <img src="/logo.webp" alt="CS Franddos" loading="lazy" className="h-8 w-auto" />
              <span className={`text-base font-bold tracking-wider uppercase transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'
                }`}>
                CS <span className="text-secondary">Franddos</span>
              </span>
            </Link>

            {/* Desktop Nav - centre pill */}
            <nav className={`hidden lg:flex items-center justify-center gap-1 rounded-full py-2 px-4 backdrop-blur-md border transition-all duration-500 ${isScrolled
              ? 'bg-white/30 border-primary/10'
              : 'bg-white/10 border-white/15'
              }`}>
              {['Home', 'Services', 'Destinations', 'About', 'Insights', 'Contact'].map((item) => {
                const isRoute = item === 'Services' || item === 'Destinations' || item === 'About' || item === 'Insights' || item === 'Contact';
                const href = isRoute ? `/${item.toLowerCase()}` : `#${item.toLowerCase()}`;
                const Tag = isRoute ? Link : 'a';
                return (
                  <Tag
                    key={item}
                    href={href}
                    className={`group flex items-center text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-white px-3 py-2 rounded-full hover:bg-accent ${isScrolled ? 'text-primary' : 'text-white'
                      }`}
                  >
                    <span className="block overflow-hidden h-[14px] leading-[14px]">
                      <span className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-[14px]">
                        <span className="block h-[14px]">{item}</span>
                        <span className="block h-[14px]">{item}</span>
                      </span>
                    </span>
                  </Tag>
                );
              })}
            </nav>

            {/* CTA - right */}
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="cta" size="sm" onClick={() => openCta()} className="group shadow-sm hover:shadow-md hover:-translate-y-0.5 hidden lg:inline-flex">
                <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started</span>
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started</span>
                </span>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                className={`lg:hidden p-1.5 rounded-lg transition-colors ${isScrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[300px] sm:w-[340px] bg-white z-[70] flex flex-col shadow-2xl"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-7 py-6 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <img src="/logo.webp" alt="CS Franddos" loading="lazy" className="h-8 w-auto" />
                  <span className="text-lg font-bold tracking-tight text-primary">
                    CS <span className="text-secondary">Franddos</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors btn-flip-icon"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col px-7 pt-6 pb-4 flex-1 overflow-y-auto">
                {['Home', 'Services', 'Destinations', 'About', 'Insights', 'Contact'].map((item, i) => {
                  const isRoute = item === 'Services' || item === 'Destinations' || item === 'About' || item === 'Insights' || item === 'Contact';
                  const href = isRoute ? `/${item.toLowerCase()}` : `#${item.toLowerCase()}`;
                  return isRoute ? (
                    <Link
                      key={item}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-border/40 last:border-0"
                    >
                      <span className="text-xl font-serif text-primary group-hover:text-accent transition-colors">{item}</span>
                      <ChevronRight size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </Link>
                  ) : (
                    <motion.a
                      key={item}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.07, type: 'spring', stiffness: 300, damping: 30 }}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-border/40 last:border-0"
                    >
                      <span className="text-xl font-serif text-primary group-hover:text-accent transition-colors">{item}</span>
                      <ChevronRight size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  );
                })}
              </nav>

              {/* Panel Footer */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="px-7 py-7 border-t border-border/60 space-y-3"
              >
                <Button variant="cta" size="lg" onClick={() => { setIsMobileMenuOpen(false); openCta(); }} className="group w-full shadow-md hover:-translate-y-0.5">
                  <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Today</span>
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Today</span>
                  </span>
                </Button>
                <p className="text-center text-sm text-muted-foreground pt-1">
                  Call us: <a href="tel:+233247789031" className="text-accent font-medium hover:underline">024 778 9031</a>
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col overflow-hidden bg-[#0A1628]">
        {playVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-vid-compressed.mp4" type="video/mp4" />
          </video>
        )}
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/55 via-[#0A1628]/50 to-[#0A1628]/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/30 via-transparent to-[#0A1628]/10 z-10" />

        {/* Main content - vertically centered in remaining space */}
        <div className="flex-1 flex items-center relative z-20">
          <div className="container mx-auto px-5 sm:px-8 md:px-12 pt-24 sm:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full text-center"
            >
              {/* Trust badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs tracking-[0.18em] uppercase mb-6 sm:mb-8 mx-auto"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                Premium Visa &amp; Travel Agency - Ghana
              </motion.span>

              {/* Headline - forced 2 lines */}
              <h1 className="text-[1.75rem] leading-[1.12] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.25rem] xl:text-[4rem] font-serif text-white mb-5 sm:mb-6 text-center">
                Don't Let The Wrong Recruiting<br />
                Agency Cost You Your Future.
              </h1>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                className="text-sm sm:text-base md:text-lg text-white max-w-xs sm:max-w-md md:max-w-xl mb-8 sm:mb-10 font-light leading-relaxed opacity-80 mx-auto"
              >
                From your passport to your plane ticket, from your visa to your first day on the job abroad, CS Franddos Limited turns "someday" into a departure date.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <Button variant="cta" size="sm" onClick={() => openCta()} className="group hover:-translate-y-0.5 w-full sm:w-auto h-9 sm:h-10 rounded-sm text-xs">
                  <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Start Your Journey</span>
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Start Your Journey</span>
                  </span>
                </Button>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button size="sm" variant="outline" className="group border-white/35 text-white hover:bg-accent hover:text-white w-full sm:w-auto font-medium uppercase tracking-wider backdrop-blur-sm bg-transparent h-9 sm:h-10 text-xs px-6 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 rounded-sm">
                    <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Explore Services</span>
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Explore Services</span>
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Country marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="relative z-20 w-full border-t border-white/15"
        >
          <div className="mx-[calc(7.5vw-12px)] overflow-hidden">
            <div className="flex whitespace-nowrap animate-ticker items-center h-16 md:h-18 gap-16">
              {[
                { flag: '🇨🇦', name: 'Canada' },
                { flag: '🇬🇧', name: 'United Kingdom' },
                { flag: '🇺🇸', name: 'United States' },
                { flag: '🇦🇪', name: 'UAE' },
                { flag: '🇩🇪', name: 'Germany' },
                { flag: '🇦🇺', name: 'Australia' },
                { flag: '🇫🇷', name: 'France' },
                { flag: '🇳🇱', name: 'Netherlands' },
                { flag: '🇮🇹', name: 'Italy' },
                { flag: '🇪🇸', name: 'Spain' },
              ].map((country, i) => (
                <span key={i} className="inline-flex items-center gap-3 text-white/80">
                  <span className="text-xl sm:text-2xl leading-none">{country.flag}</span>
                  <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">{country.name}</span>
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { flag: '🇨🇦', name: 'Canada' },
                { flag: '🇬🇧', name: 'United Kingdom' },
                { flag: '🇺🇸', name: 'United States' },
                { flag: '🇦🇪', name: 'UAE' },
                { flag: '🇩🇪', name: 'Germany' },
                { flag: '🇦🇺', name: 'Australia' },
                { flag: '🇫🇷', name: 'France' },
                { flag: '🇳🇱', name: 'Netherlands' },
                { flag: '🇮🇹', name: 'Italy' },
                { flag: '🇪🇸', name: 'Spain' },
              ].map((country, i) => (
                <span key={`dup-${i}`} className="inline-flex items-center gap-3 text-white/80">
                  <span className="text-xl sm:text-2xl leading-none">{country.flag}</span>
                  <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">{country.name}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>


      {/* 3. CLIENT VOICES - VIDEO REVIEWS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">

          {/* Header */}
          <Reveal y={24} duration={0.6} once className="mb-14">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Hear From Our Clients</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Real stories from real people whose lives were changed by CS Frandos.
            </p>
          </Reveal>

          {/* Video Cards Grid */}
          {featuredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTestimonials.filter((t: any) => t.videoUrl).map((t: any, i: number) => (
                <Reveal
                  key={t._id}
                  delay={(i % 4) * 0.1}
                  y={24}
                  duration={0.55}
                  className="group rounded-[4px] overflow-hidden border border-border bg-black shadow-sm"
                >
                  <VideoPlayer src={t.videoUrl} poster={t.thumbnailUrl ?? undefined} />
                </Reveal>
              ))}
            </div>
          ) : null}

          {/* See all reviews CTA */}
          <Reveal y={16} duration={0.5} once className="mt-10">
            <Link href="/reviews">
              <Button variant="cta" size="sm" className="group shadow-sm hover:shadow-md hover:-translate-y-0.5 gap-2">
                See all reviews
                <ArrowRight size={16} />
              </Button>
            </Link>
          </Reveal>

        </div>
      </section>


      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal y={30} duration={0.8} className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Unlocking Borders With Precision</h2>
            <p className="text-muted-foreground max-w-2xl text-lg">We provide end-to-end solutions for travelers, professionals, and students seeking global opportunities.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Plane, title: 'Travel & Tour', tag: 'Luxury Packages', desc: 'Curated itineraries, premium hotel reservations, and unforgettable experiences across the globe.', img: serviceTravelImg },
              { icon: Briefcase, title: 'Jobs Abroad', tag: 'International Recruitment', desc: 'Exclusive placement of skilled professionals in leading companies across North America, Europe & the Gulf.', img: serviceJobsImg },
              { icon: FileCheck, title: 'Visa Application', tag: '98% Approval Rate', desc: 'Expert guidance through every visa category with meticulous attention to consular requirements.', img: serviceVisaImg },
              { icon: Landmark, title: 'Passport & Birth Certificate', tag: 'Document Services', desc: 'Expedited passport acquisition, renewals, and vital document assistance - start to finish.', img: servicePassportImg },
            ].map((service, i) => (
              <Reveal
                key={i}
                delay={i * 0.1}
                y={30}
                duration={0.8}
                className="group rounded overflow-hidden cursor-pointer shadow-md transition-shadow duration-500 flex flex-col hover:-translate-y-2 hover:scale-[1.01]"
              >
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.jpg' }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-white border border-white/20 rounded-full px-2.5 py-0.5 backdrop-blur-sm bg-primary/60">
                      {service.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm flex items-center justify-center text-white">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 sm:p-6 flex flex-col flex-1">
                  <div className="w-9 h-9 rounded bg-accent/10 flex items-center justify-center text-accent mb-3 shrink-0">
                    <service.icon strokeWidth={1.5} size={18} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif text-primary mb-1 leading-tight">{service.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* 5.5 CEO SECTION */}
      <section className="relative py-28 md:py-36 bg-accent-light overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 25% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 50%, #5A3A78 0%, transparent 50%)` }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {/* CEO Image */}
            <Reveal y={30} duration={0.8} className="relative lg:w-1/2 min-h-[300px] md:min-h-[400px] overflow-hidden rounded-lg">
              <img
                src="/Mr Francis.webp"
                alt="CEO - CS Franddos Limited"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-secondary text-primary text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 shadow-lg">
                CEO & Founder
              </div>
            </Reveal>

            {/* CEO Message */}
            <div className="lg:w-1/2 flex items-center px-8 md:px-14 py-12 md:py-16">
              <div className="max-w-xl">
                <Reveal y={30} duration={0.8} delay={0.1}>
                  <span className="text-secondary text-sm font-bold tracking-[0.2em] uppercase inline-block mb-3">
                    A Message from Our Founder
                  </span>
                </Reveal>
                <Reveal y={30} duration={0.8} delay={0.2}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
                    "We don't just process paperwork -<br />
                    <span className="text-secondary">we open doors to new beginnings.</span>"
                  </h2>
                </Reveal>
                <Reveal y={30} duration={0.8} delay={0.3}>
                  <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                    At CS Franddos, every visa approved, every ticket booked, and every
                    job secured is a family's story changed for the better. Our team works
                    tirelessly to ensure your journey - whether academic, professional, or
                    personal - is seamless from start to finish.
                  </p>
                </Reveal>
                <Reveal y={30} duration={0.8} delay={0.4} className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                  <div className="relative pl-5 border-l-2 border-secondary">
                    <p className="text-secondary font-bold font-serif text-2xl md:text-3xl tracking-wider uppercase">Francis Addo Agbanawo</p>
                    <p className="text-white/60 text-sm tracking-wide mt-0.5">CEO &amp; Founder, CS Franddos Limited</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RUNNING OFFERS */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal y={30} duration={0.8} className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Current Promotions</h2>
            <p className="text-muted-foreground max-w-xl text-lg">Special packages designed to make your global journey more accessible.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Family Visa Bundle', desc: 'Apply for 3 or more family visas and save 20% on service fees. Terms apply.', discount: '20% OFF', color: 'bg-secondary/10 border-secondary/30', badge: 'bg-secondary text-primary' },
              { title: 'Study Abroad Combo', desc: 'Free university consultation when you book our visa processing service for any UK or Canadian institution.', discount: 'Free Consult', color: 'bg-primary/5 border-primary/20', badge: 'bg-primary text-white' },
              { title: 'Summer Travel Deal', desc: 'Book a premium travel package and receive complimentary airport transfer in 10+ destinations.', discount: 'Free Transfer', color: 'bg-secondary/10 border-secondary/30', badge: 'bg-secondary text-primary' },
            ].map((offer, i) => (
              <Reveal
                key={i}
                delay={i * 0.1}
                y={30}
                duration={0.8}
                className="relative rounded border-2 p-6 sm:p-8 flex flex-col transition-shadow duration-300 hover:-translate-y-1.5"
              >
                <span className={`${offer.badge} text-[10px] font-bold tracking-widest uppercase rounded px-2.5 py-1 self-start mb-4`}>
                  {offer.discount}
                </span>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">{offer.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{offer.desc}</p>
                <div className="flex items-center text-sm font-medium text-accent">
                  Learn More
                  <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. POPULAR TOUR PACKAGES */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal y={30} duration={0.8} className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
              Discover Beautiful Places<br className="hidden sm:block" /> Around the World
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Handpicked travel packages with everything taken care of - from visas to accommodation.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: parisImg, name: 'Paris', country: 'France', rating: 4.9, reviews: 1200, price: '₵1,299', duration: '6 Day 5 Night', slug: 'paris' },
              { img: dubaiImg, name: 'Dubai', country: 'UAE', rating: 5.0, reviews: 2148, price: '₵999', duration: '4 Day 3 Night', slug: 'dubai' },
              { img: londonImg, name: 'London', country: 'UK', rating: 4.8, reviews: 1850, price: '₵1,499', duration: '7 Day 6 Night', slug: 'london' },
              { img: torontoImg, name: 'Toronto', country: 'Canada', rating: 4.9, reviews: 980, price: '₵1,199', duration: '5 Day 4 Night', slug: 'toronto' },
              { img: nycImg, name: 'New York', country: 'USA', rating: 4.7, reviews: 3200, price: '₵1,350', duration: '6 Day 5 Night', slug: 'new-york' },
              { img: amsterdamImg, name: 'Amsterdam', country: 'Netherlands', rating: 4.8, reviews: 740, price: '₵1,099', duration: '5 Day 4 Night', slug: 'amsterdam' },
            ].map((pkg, i) => (
              <Link key={i} href={`/destination/${pkg.slug}`} className="block">
                <Reveal
                  delay={i * 0.1}
                  y={30}
                  duration={0.8}
                  className="group bg-white rounded overflow-hidden shadow-sm transition-shadow duration-500 flex flex-col cursor-pointer hover:-translate-y-1.5"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={pkg.img}
                      alt={pkg.name}
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.jpg' }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-accent/85 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase rounded-full px-3.5 py-1.5 shadow-md border border-white/20">
                        <MapPin size={9} />
                        {pkg.country}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-serif font-bold text-primary mb-1">{pkg.name}, {pkg.country}</h3>

                    <div className="flex items-center gap-1.5 mb-4">
                      <Star size={13} className="fill-secondary text-secondary" />
                      <span className="text-sm font-medium text-foreground">{pkg.rating.toFixed(1)}/5</span>
                      <span className="text-xs text-muted-foreground">({pkg.reviews.toLocaleString()}+ reviews)</span>
                    </div>

                    <div className="h-px bg-border mb-4" />

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-2xl font-serif font-bold text-primary">{pkg.price}</span>
                        <span className="text-xs text-muted-foreground ml-1">/ {pkg.duration}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-primary border border-primary/30 group-hover:bg-accent group-hover:text-white group-hover:border-accent rounded-full px-4 py-1.5 transition-all duration-300">
                        <span>View Details</span>
                        <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                </Reveal>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <Reveal y={20} duration={0.7} delay={0.3} className="flex justify-center mt-14">
            <Button variant="cta" size="lg" onClick={() => openCta()} className="group shadow-md hover:-translate-y-0.5">
              <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">View All Packages</span>
                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">View All Packages</span>
              </span>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 8. STATISTICS COUNTER */}
      <section className="py-20 bg-accent-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: 9, suffix: '+', label: 'Years in Business' },
              { num: 5678, suffix: '+', label: 'Happy Clients' },
              { num: 674, suffix: '+', label: 'Visas Approved' },
              { num: 40, suffix: '+', label: 'Countries Served' },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i === 1 || i === 3 ? 'border-l border-accent/20 pl-8 md:pl-0 md:border-l-0' : ''} ${i >= 1 ? 'md:border-l border-accent/20 md:pl-12' : ''}`}>
                <div className="text-4xl md:text-6xl font-serif text-secondary mb-2 flex">
                  <AnimatedCounter to={stat.num} duration={2.5} />
                  <span>{stat.suffix}</span>
                </div>
                <span className="text-white/70 text-sm md:text-base font-medium tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. HOW IT WORKS */}
      <section className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left side - content and interactive steps */}
            <div className="lg:col-span-6 flex flex-col justify-center">

              {/* Header Info */}
              <div className="mb-16 text-left">
                <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                  Quick Steps to Your Trip
                </h2>
              </div>

              {/* Vertical steps */}
              <div className="space-y-4">
                {[
                  {
                    title: 'Find Your Destination',
                    desc: 'Start your journey by exploring destinations that match your dreams, style, and travel goals.',
                    icon: Search,
                    img: serviceTravelImg,
                  },
                  {
                    title: 'Book Your Trip',
                    desc: 'Choose the best flights, hotels, and packages with ease through our seamless booking experience.',
                    icon: MessageSquare,
                    img: serviceJobsImg,
                  },
                  {
                    title: 'Secure Your Booking',
                    desc: 'Make fast and secure payments with flexible options designed for your convenience and peace of mind.',
                    icon: Zap,
                    img: serviceVisaImg,
                  },
                  {
                    title: 'Enjoy Your Journey',
                    desc: 'Relax and explore while CS Franddos handles every detail, ensuring a smooth and unforgettable transition.',
                    icon: Globe,
                    img: parisImg,
                  },
                ].map((step, idx) => {
                  const isActive = activeStep === idx;
                  const IconComponent = step.icon;

                  return (
                    <motion.div
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      onMouseEnter={() => setActiveStep(idx)}
                      className={`flex items-start gap-4 p-5 cursor-pointer transition-all duration-300 rounded border ${isActive
                        ? 'bg-white border-accent/20 shadow-md shadow-accent/5'
                        : 'bg-transparent border-transparent hover:bg-muted/10'
                        }`}
                      layoutId={`step-card-${idx}`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    >
                      {/* Icon container */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                          }`}
                      >
                        <IconComponent strokeWidth={1.5} size={20} />
                      </div>

                      {/* Text content */}
                      <div>
                        <h4
                          className={`text-lg font-serif font-bold transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground/80'
                            }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right side - Dynamic Image Frame */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full aspect-square rounded overflow-hidden bg-muted shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    src={
                      activeStep === 0
                        ? serviceTravelImg
                        : activeStep === 1
                          ? serviceJobsImg
                          : activeStep === 2
                            ? serviceVisaImg
                            : parisImg
                    }
                    alt="Trip step destination visual"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/20 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. INTERNATIONAL RECRUITMENT */}
      <section id="recruitment" className="py-24 md:py-32 bg-[#F5F2EB] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left Info Column */}
            <Reveal y={30} duration={0.8} className="lg:col-span-5 text-left">
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                Elevate Your Career <br />
                <span className="text-secondary font-serif font-light">Global Scale.</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed font-light">
                We facilitate exclusive career placements for highly qualified African professionals in leading organizations across North America, Europe, and the Middle East. Our consultants manage the entire transition, ensuring compliance and peace of mind.
              </p>
              <Link href="/vacancies">
                <Button variant="cta" size="xl" className="group hover:-translate-y-0.5">
                  <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Explore Opportunities</span>
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Explore Opportunities</span>
                  </span>
                </Button>
              </Link>
            </Reveal>

            {/* Right Countries Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  country: 'Canada',
                  flag: '🇨🇦',
                  code: 'CAN',
                  pathways: ['Healthcare Leadership', 'Advanced Tech / AI', 'Engineering Services']
                },
                {
                  country: 'United States',
                  flag: '🇺🇸',
                  code: 'USA',
                  pathways: ['Software & Cloud Systems', 'Clinical & Life Sciences', 'Strategic Management']
                },
                {
                  country: 'Germany',
                  flag: '🇩🇪',
                  code: 'DEU',
                  pathways: ['Engineering & Automotive', 'Medical Specialists', 'Technical Trades']
                },
                {
                  country: 'Serbia',
                  flag: '🇷🇸',
                  code: 'SRB',
                  pathways: ['IT & Software Development', 'Engineering & Manufacturing', 'Medical & Healthcare']
                },
                {
                  country: 'Gulf Countries',
                  flag: '🇦🇪',
                  code: 'GCC',
                  pathways: ['Oil & Gas Engineering', 'Hospitality Management', 'Construction & Infrastructure']
                },
              ].map((loc, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.1}
                  y={30}
                  duration={0.8}
                  className="bg-white border border-border/80 shadow-sm p-8 rounded transition-all duration-500 group relative overflow-hidden flex flex-col justify-between min-h-[220px] hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-lg"
                >
                  <span className="absolute right-6 bottom-4 text-7xl md:text-8xl font-black font-sans text-primary/[0.015] tracking-tighter select-none pointer-events-none group-hover:text-accent/[0.04] transition-colors duration-500">
                    {loc.code}
                  </span>

                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl leading-none">{loc.flag}</span>
                        <h4 className="text-primary font-serif font-bold text-xl md:text-2xl tracking-tight">
                          {loc.country}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-accent/80 bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                        {loc.code}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {loc.pathways.map((path, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                          <span>{path}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex items-center text-xs font-medium text-accent group-hover:text-primary transition-colors duration-300">
                    View Placement Pathways
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-2 md:sticky md:top-28">
              <Reveal y={20} duration={0.6} delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                  Frequently Asked Questions
                </h2>
              </Reveal>
              <Reveal y={20} duration={0.6} delay={0.2}>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Clear answers for your journey ahead. If you don't find what you're looking for, feel free to reach out to our team.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-3 space-y-4">
              {faqItems.map((faq, i) => (
                <Accordion type="single" collapsible key={i}>
                  <AccordionItem value={`item-${i}`} className="bg-[#F5F0E8] rounded px-6 border border-transparent">
                    <AccordionTrigger className="text-left text-base md:text-lg font-serif font-medium text-primary hover:text-accent py-5 gap-4">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base pb-5 pt-0">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-32 bg-background relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F5F0E8] hidden lg:block rounded"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            <Reveal x={-30} y={0} duration={0.8}>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Get In Touch</h2>
              <p className="text-muted-foreground text-lg mb-12">Visit our office or reach out to our team of experts. Your global journey begins with a single conversation.</p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary text-lg">Head Office</h5>
                    <p className="text-muted-foreground mt-1">Ashiaman, Near Tigo Office<br />Greater Accra, Ghana</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary text-lg">Phone Lines</h5>
                    <div className="text-muted-foreground mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
                      <span>024 778 9031</span>
                      <span>059 873 7651</span>
                      <span>024 203 5562</span>
                      <span>059 825 6003</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary text-lg">Email</h5>
                    <p className="text-muted-foreground mt-1">csfranddosltd@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12 w-full h-[250px] rounded overflow-hidden border border-border">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.0825%2C5.645%2C-0.065%2C5.660&layer=mapnik&marker=5.652%2C-0.073"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CS Franddos Office Location"
                />
              </div>
            </Reveal>

            <Reveal x={30} y={0} duration={0.8} className="bg-white p-8 md:p-12 rounded shadow-xl border border-border/50">
              <h3 className="text-2xl font-serif text-primary mb-8 font-bold">Request a Consultation</h3>
              <ContactForm />
            </Reveal>

          </div>
        </div>
      </section>

      {/* 14. INSIGHTS */}
      <section id="insights" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal y={30} duration={0.8} className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
              Latest From Our Desk
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Expert advice on visas, travel, and global career opportunities.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {postsLoading ? (
              Array.from({length: 3}).map((_, i) => (
                <div key={i} className="flex flex-col border border-border/60 bg-background rounded-[4px] overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-muted" />
                  <div className="flex flex-col flex-1 p-5 space-y-3">
                    <div className="h-3 w-24 bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-full bg-muted rounded mt-2" />
                    <div className="h-3 w-2/3 bg-muted rounded" />
                  </div>
                </div>
              ))
            ) : latestPosts.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-12">
                No articles yet. Check back soon.
              </div>
            ) : (
              latestPosts.map((post, i) => (
              <Reveal
                key={post._id}
                delay={i * 0.1}
                y={30}
                duration={0.8}
                className="flex flex-col border border-border/60 bg-background rounded-[4px] overflow-hidden h-full shadow-sm"
              >
                <div className="flex flex-col flex-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl || '/fallback.jpg'}
                      alt={post.title}
                      onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.jpg' }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {post.tag && (
                      <span className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase text-white bg-primary/60 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1">
                        {post.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    {post.date && (
                      <div className="flex items-center gap-3 text-muted-foreground text-[11px] mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {post.date}
                        </span>
                      </div>
                    )}
                    <h3 className="text-base font-serif font-bold text-primary leading-snug line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                        {post.summary.length > 110 ? post.summary.slice(0, 110).trim() + '...' : post.summary}
                      </p>
                    )}
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <Link href={`/insights/${post.slug.current}`}>
                        <Button size="sm" variant="ctaOutline" className="text-xs">
                          Read Article <ArrowRight size={12} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )))}
          </div>
        </div>
      </section>

      {/* 15. FINAL CTA STRIP */}
      <section className="bg-gradient-to-r from-primary to-[#1A2C4A] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 font-bold">
            Your Journey Starts Here
          </h2>
          <Button variant="cta" size="xl" onClick={() => openCta()} className="group shadow-lg shadow-black/10 hover:-translate-y-0.5">
            <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
              <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Now</span>
              <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Now</span>
            </span>
          </Button>
        </div>
      </section>

      {/* 16. FOOTER */}
      <footer className="bg-accent pt-20 pb-10 text-white/70 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-1">
              <img src="/logo.webp" alt="CS Franddos" className="h-10 w-auto block mb-6" />
              <p className="text-sm leading-relaxed mb-8 max-w-xs">
                A premium travel, visa, and international recruitment agency dedicated to unlocking borders and building global careers.
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com/csfranddos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://instagram.com/csfranddos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://twitter.com/csfranddos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="https://wa.me/233247789031" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/about" className="hover:text-secondary transition-colors">About Us</a></li>
                <li><a href="/destinations" className="hover:text-secondary transition-colors">Destinations</a></li>
                <li><a href="#recruitment" className="hover:text-secondary transition-colors">Careers Abroad</a></li>
                <li><a href="/contact" className="hover:text-secondary transition-colors">Contact Support</a></li>
                <li><a href="/contact" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-6"><a href="/services" className="hover:text-secondary transition-colors">Services</a></h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/services" className="hover:text-secondary transition-colors">Visa Application</a></li>
                <li><a href="/services" className="hover:text-secondary transition-colors">Travel & Tour</a></li>
                <li><a href="/services" className="hover:text-secondary transition-colors">Ticketing & Hotel</a></li>
                <li><a href="/services" className="hover:text-secondary transition-colors">Passport Assistance</a></li>
                <li><a href="/services" className="hover:text-secondary transition-colors">Birth Certificates</a></li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <h4 className="text-white font-serif font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                  <span>Ashiaman, Near Tigo Office<br />Greater Accra, Ghana</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span>024 778 9031</span><br />
                    <span>024 203 5562</span><br />
                    <span>059 873 7651</span><br />
                    <span>059 825 6003</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-secondary shrink-0" />
                  <span>csfranddosltd@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} CS Franddos Limited. All rights reserved.</p>
            <p>Designed for Global Excellence by <a href="https://ogenci.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors underline underline-offset-2">OGENCI</a></p>
          </div>
        </div>
      </footer>

    </div>
  );
}
