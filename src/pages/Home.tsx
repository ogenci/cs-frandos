import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { Link } from 'wouter';
import { Plane, Briefcase, FileCheck, Landmark, ArrowRight, ShieldCheck, UserCheck, Globe, Star, MapPin, Phone, Mail, ChevronRight, ChevronDown, Send, Menu, X, Facebook, Instagram, Twitter, Search, MessageSquare, Zap } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import parisImg from '@assets/generated_images/paris.jpg';
import dubaiImg from '@assets/generated_images/dubai.jpg';
import londonImg from '@assets/generated_images/london.jpg';
import torontoImg from '@assets/generated_images/toronto.jpg';
import nycImg from '@assets/generated_images/nyc.jpg';
import amsterdamImg from '@assets/generated_images/amsterdam.jpg';
import test1Img from '@assets/generated_images/testimonial1.jpg';
import test2Img from '@assets/generated_images/testimonial2.jpg';
import test3Img from '@assets/generated_images/testimonial3.jpg';
import serviceTravelImg from '@assets/generated_images/service-travel.jpg';
import serviceJobsImg from '@assets/generated_images/service-jobs.jpg';
import serviceVisaImg from '@assets/generated_images/service-visa.jpg';
import servicePassportImg from '@assets/generated_images/service-passport.jpg';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  service: z.string().min(1, 'Please select a service.'),
  message: z.string().min(10, 'Message must be at least 10 characters.')
});

export default function Home() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    }
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    toast({
      title: 'Message Sent Successfully',
      description: 'Our team will contact you within 24 hours.',
    });
    contactForm.reset();
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeUpItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">

      {/* PAGE GUIDE LINES - fixed overlay, pointer-events off */}
      <div className="pointer-events-none fixed inset-0 z-[999] mix-blend-difference" aria-hidden="true">
        <div className="absolute inset-y-0 left-[calc(7.5vw-12px)] w-px bg-white opacity-15" />
        <div className="absolute inset-y-0 right-[calc(7.5vw-12px)] w-px bg-white opacity-15" />
      </div>

      {/* 1. NAVIGATION */}
      <header
        className={`fixed top-2 z-50 transition-all duration-500 rounded-[4px] border backdrop-blur-md ${
          isScrolled
            ? 'bg-white/20 shadow-lg border-white/20'
            : 'bg-white/5 border-white/10'
        }`}
        style={{ left: 'calc(7.5vw)', right: 'calc(7.5vw)' }}
      >
        <div className="w-full px-5 py-2.5 flex items-center justify-between gap-4">

          {/* Logo - left */}
          <Link href="/" className="flex items-center shrink-0 gap-2.5">
            <img src="/logo.png" alt="CS Frandos" className="h-8 w-auto" />
            <span className={`text-base font-bold tracking-wider uppercase transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              CS <span className="text-secondary">Frandos</span>
            </span>
          </Link>

          {/* Desktop Nav - centre pill */}
          <nav className={`hidden lg:flex items-center justify-center gap-1 rounded-full py-2 px-4 backdrop-blur-md border transition-all duration-500 ${
            isScrolled
              ? 'bg-white/30 border-primary/10'
              : 'bg-white/10 border-white/15'
          }`}>
            {['Home', 'Services', 'Destinations', 'About', 'Insights', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`group flex items-center text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-secondary px-3 py-2 rounded-full hover:bg-black/60 ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}
              >
                <span className="block overflow-hidden h-[14px] leading-[14px]">
                  <span className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-[14px]">
                    <span className="block h-[14px]">{item}</span>
                    <span className="block h-[14px]">{item}</span>
                  </span>
                </span>
              </a>
            ))}
          </nav>

          {/* CTA - right */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              size="sm"
              className={`group hidden lg:flex rounded-full px-5 h-8 font-medium uppercase tracking-wider items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                isScrolled
                  ? 'bg-primary text-white hover:bg-secondary hover:text-primary'
                  : 'bg-white text-primary hover:bg-secondary hover:text-primary'
              }`}
            >
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
                  <img src="/logo.png" alt="CS Frandos" className="h-8 w-auto" />
                  <span className="text-lg font-bold tracking-tight text-primary">
                    CS <span className="text-secondary">Frandos</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors btn-flip-icon"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col px-7 pt-6 pb-4 flex-1 overflow-y-auto">
                {['Home', 'Services', 'Destinations', 'About', 'Insights', 'Contact'].map((item, i) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, type: 'spring', stiffness: 300, damping: 30 }}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-4 border-b border-border/40 last:border-0"
                  >
                    <span className="text-xl font-serif text-primary group-hover:text-secondary transition-colors">{item}</span>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </nav>

              {/* Panel Footer */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="px-7 py-7 border-t border-border/60 space-y-3"
              >
                <Button size="lg" className="group w-full rounded-full bg-primary text-white font-medium uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:bg-secondary hover:text-primary hover:-translate-y-0.5 shadow-md">
                  <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Today</span>
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Today</span>
                  </span>
                </Button>
                <p className="text-center text-sm text-muted-foreground pt-1">
                  Call us: <a href="tel:+233247789031" className="text-secondary font-medium hover:underline">024-778-9031</a>
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-vid.mp4" type="video/mp4" />
        </video>
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/55 via-[#0A1628]/50 to-[#0A1628]/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/30 via-transparent to-[#0A1628]/10 z-10" />

        {/* Main content - vertically centered in remaining space */}
        <div className="flex-1 flex items-center relative z-20">
          <div className="container mx-auto px-5 sm:px-8 md:px-12 pt-24 sm:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
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
                Don't Let The Wrong Agent<br />
                Cost You Your Future.
              </h1>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                className="text-sm sm:text-base md:text-lg text-white max-w-xs sm:max-w-md md:max-w-xl mb-8 sm:mb-10 font-light leading-relaxed opacity-80 mx-auto"
              >
                From your passport to your plane ticket, from your visa to your first day on the job abroad, CS Frandos Limited turns "someday" into a departure date.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <a href="#contact" className="w-full sm:w-auto">
                  <Button size="sm" className="group bg-white text-primary hover:bg-secondary hover:text-primary w-full sm:w-auto rounded-full font-medium uppercase tracking-wider px-6 h-9 sm:h-10 text-sm shadow-lg shadow-black/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5">
                    <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Start Your Journey</span>
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Start Your Journey</span>
                    </span>
                  </Button>
                </a>
                <a href="#services" className="w-full sm:w-auto">
                  <Button size="sm" variant="outline" className="group border-white/35 text-white hover:bg-white hover:text-primary w-full sm:w-auto rounded-full font-medium uppercase tracking-wider backdrop-blur-sm bg-transparent h-9 sm:h-10 text-sm px-6 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5">
                    <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Explore Services</span>
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Explore Services</span>
                    </span>
                  </Button>
                </a>
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


      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.h2 variants={fadeUpItem} className="text-4xl md:text-5xl font-serif text-primary mb-4">Unlocking Borders With Precision</motion.h2>
            <motion.p variants={fadeUpItem} className="text-muted-foreground max-w-2xl text-lg">We provide end-to-end solutions for travelers, professionals, and students seeking global opportunities.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {[
              { icon: Plane, title: 'Travel & Tour', tag: 'Luxury Packages', desc: 'Curated itineraries, premium hotel reservations, and unforgettable experiences across the globe.', img: serviceTravelImg },
              { icon: Briefcase, title: 'Jobs Abroad', tag: 'International Recruitment', desc: 'Exclusive placement of skilled professionals in leading companies across North America, Europe & the Gulf.', img: serviceJobsImg },
              { icon: FileCheck, title: 'Visa Application', tag: '98% Approval Rate', desc: 'Expert guidance through every visa category with meticulous attention to consular requirements.', img: serviceVisaImg },
              { icon: Landmark, title: 'Passport & Birth Certificate', tag: 'Document Services', desc: 'Expedited passport acquisition, renewals, and vital document assistance - start to finish.', img: servicePassportImg },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="group rounded overflow-hidden cursor-pointer shadow-md transition-shadow duration-500 flex flex-col"
              >
                {/* Image - fixed height */}
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img
                    src={service.img}
                    alt={service.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.jpg' }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-white/70 border border-white/25 rounded-full px-2.5 py-0.5 backdrop-blur-sm bg-white/10">
                      {service.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-secondary">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>

                {/* Content - fits text */}
                <div className="bg-white p-5 sm:p-6 flex flex-col">
                  <div className="w-9 h-9 rounded bg-secondary/15 flex items-center justify-center text-secondary mb-3 shrink-0">
                    <service.icon strokeWidth={1.5} size={18} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif text-primary mb-1 leading-tight">{service.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3">
                    {service.desc}
                  </p>
                  <div className="flex items-center text-xs font-medium text-secondary mt-auto">
                    Learn more
                    <ArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* 6. RUNNING OFFERS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center mb-12"
          >
            <motion.h2 variants={fadeUpItem} className="text-4xl md:text-5xl font-serif text-primary mb-4">Current Promotions</motion.h2>
            <motion.p variants={fadeUpItem} className="text-muted-foreground max-w-xl text-lg">Special packages designed to make your global journey more accessible.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'Family Visa Bundle', desc: 'Apply for 3 or more family visas and save 20% on service fees. Terms apply.', discount: '20% OFF', color: 'bg-secondary/10 border-secondary/30', badge: 'bg-secondary text-primary' },
              { title: 'Study Abroad Combo', desc: 'Free university consultation when you book our visa processing service for any UK or Canadian institution.', discount: 'Free Consult', color: 'bg-primary/5 border-primary/20', badge: 'bg-primary text-white' },
              { title: 'Summer Travel Deal', desc: 'Book a premium travel package and receive complimentary airport transfer in 10+ destinations.', discount: 'Free Transfer', color: 'bg-secondary/10 border-secondary/30', badge: 'bg-secondary text-primary' },
            ].map((offer, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                whileHover={{ y: -6 }}
                className="relative rounded border-2 p-6 sm:p-8 flex flex-col transition-shadow duration-300"
              >
                <span className={`${offer.badge} text-[10px] font-bold tracking-widest uppercase rounded px-2.5 py-1 self-start mb-4`}>
                  {offer.discount}
                </span>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">{offer.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{offer.desc}</p>
                <div className="flex items-center text-sm font-medium text-secondary">
                  Learn More
                  <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. POPULAR TOUR PACKAGES */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.h2 variants={fadeUpItem} className="text-4xl md:text-5xl font-serif text-primary mb-4">
              Discover Beautiful Places<br className="hidden sm:block" /> Around the World
            </motion.h2>
            <motion.p variants={fadeUpItem} className="text-muted-foreground max-w-xl text-lg">
              Handpicked travel packages with everything taken care of - from visas to accommodation.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {[
              { img: parisImg,    name: 'Paris',        country: 'France',      rating: 4.9, reviews: 1200, price: '₵1,299', duration: '6 Day 5 Night' },
              { img: dubaiImg,    name: 'Dubai',        country: 'UAE',         rating: 5.0, reviews: 2148, price: '₵999',   duration: '4 Day 3 Night' },
              { img: londonImg,   name: 'London',       country: 'UK',          rating: 4.8, reviews: 1850, price: '₵1,499', duration: '7 Day 6 Night' },
              { img: torontoImg,  name: 'Toronto',      country: 'Canada',      rating: 4.9, reviews: 980,  price: '₵1,199', duration: '5 Day 4 Night' },
              { img: nycImg,      name: 'New York',     country: 'USA',         rating: 4.7, reviews: 3200, price: '₵1,350', duration: '6 Day 5 Night' },
              { img: amsterdamImg,name: 'Amsterdam',    country: 'Netherlands', rating: 4.8, reviews: 740,  price: '₵1,099', duration: '5 Day 4 Night' },
            ].map((pkg, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="group bg-white rounded overflow-hidden shadow-sm transition-shadow duration-500 flex flex-col"
              >
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.img}
                    alt={pkg.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.jpg' }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Country badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-medium tracking-widest uppercase rounded-full px-3 py-1 shadow-sm">
                      <MapPin size={9} />
                      {pkg.country}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-serif font-bold text-primary mb-1">{pkg.name}, {pkg.country}</h3>

                  {/* Stars + reviews */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <Star size={13} className="fill-secondary text-secondary" />
                    <span className="text-sm font-medium text-foreground">{pkg.rating.toFixed(1)}/5</span>
                    <span className="text-xs text-muted-foreground">({pkg.reviews.toLocaleString()}+ reviews)</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border mb-4" />

                  {/* Price + CTA row */}
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-2xl font-serif font-bold text-primary">{pkg.price}</span>
                      <span className="text-xs text-muted-foreground ml-1">/ {pkg.duration}</span>
                    </div>
                    <a href="#contact">
                      <button className="flex items-center gap-1.5 text-sm font-medium text-primary border border-primary/30 hover:bg-primary hover:text-white hover:border-primary rounded-full px-4 py-1.5 transition-all duration-300">
                        <span>Book Now</span>
                      </button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center mt-14"
          >
            <a href="#contact">
              <Button size="lg" className="group rounded-full bg-primary text-white hover:bg-secondary hover:text-primary flex items-center justify-center px-8 font-medium uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 shadow-md">
                <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">View All Packages</span>
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">View All Packages</span>
                </span>
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 8. STATISTICS COUNTER */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: 15, suffix: '+', label: 'Years in Business' },
              { num: 1000, suffix: '+', label: 'Happy Clients' },
              { num: 500, suffix: '+', label: 'Visas Approved' },
              { num: 40, suffix: '+', label: 'Countries Served' },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i === 1 || i === 3 ? 'border-l border-secondary/20 pl-8 md:pl-0 md:border-l-0' : ''} ${i >= 1 ? 'md:border-l md:pl-12' : ''}`}>
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
              <div className="mb-10 text-left">
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
                    desc: 'Relax and explore while CS Frandos handles every detail, ensuring a smooth and unforgettable transition.',
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
                      className={`flex items-start gap-4 p-5 cursor-pointer transition-all duration-300 rounded border ${
                        isActive
                          ? 'bg-white border-border/80 shadow-md shadow-primary/5'
                          : 'bg-transparent border-transparent hover:bg-muted/10'
                      }`}
                      layoutId={`step-card-${idx}`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    >
                      {/* Icon container */}
                      <div
                         className={`flex-shrink-0 w-12 h-12 rounded flex items-center justify-center transition-colors duration-300 ${
                          isActive ? 'bg-primary/5 text-primary' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <IconComponent strokeWidth={1.5} size={20} />
                      </div>

                      {/* Text content */}
                      <div>
                        <h4
                          className={`text-lg font-serif font-bold transition-colors duration-300 ${
                            isActive ? 'text-primary' : 'text-foreground/80'
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
      <section id="recruitment" className="py-28 md:py-36 bg-[#F5F2EB] relative overflow-hidden">
        {/* Soft elegant luxury gradient layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 text-left"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                Elevate Your Career <br />
                <span className="text-secondary font-serif font-light">Global Scale.</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed font-light">
                We facilitate exclusive career placements for highly qualified African professionals in leading organizations across North America, Europe, and the Middle East. Our consultants manage the entire transition, ensuring compliance and peace of mind.
              </p>
              <Button size="xl" className="group rounded-full bg-primary text-white hover:bg-secondary hover:text-primary transition-all duration-300 font-medium uppercase tracking-wider px-8 py-6 h-12 flex items-center justify-center hover:-translate-y-0.5">
                <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Explore Opportunities</span>
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Explore Opportunities</span>
                </span>
              </Button>
            </motion.div>

            {/* Right Countries Grid */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { 
                  country: 'Canada', 
                  flag: '🇨🇦',
                  code: 'CAN', 
                  pathways: ['Healthcare Leadership', 'Advanced Tech / AI', 'Engineering Services']
                },
                { 
                  country: 'United Kingdom', 
                  flag: '🇬🇧',
                  code: 'GBR', 
                  pathways: ['Clinical Practice', 'Education & Care', 'Financial Systems']
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
              ].map((loc, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUpItem} 
                  whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.5)', boxShadow: '0 10px 30px -10px rgba(10,22,40,0.08)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-border/80 shadow-sm p-8 rounded transition-all duration-500 group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                >
                  {/* Subtle code watermark on background */}
                  <span className="absolute right-6 bottom-4 text-7xl md:text-8xl font-black font-sans text-primary/[0.015] tracking-tighter select-none pointer-events-none group-hover:text-secondary/[0.03] transition-colors duration-500">
                    {loc.code}
                  </span>

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl leading-none">{loc.flag}</span>
                        <h4 className="text-primary font-serif font-bold text-xl md:text-2xl tracking-tight">
                          {loc.country}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-secondary/80 bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                        {loc.code}
                      </span>
                    </div>

                    {/* Pathways list */}
                    <ul className="space-y-2.5">
                      {loc.pathways.map((path, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0" />
                          <span>{path}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer links */}
                  <div className="mt-8 flex items-center text-xs font-medium text-secondary group-hover:text-primary transition-colors duration-300">
                    View Placement Pathways
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Stories of Success</h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { name: 'Kwame Mensah', role: 'IT Professional, Canada', text: 'CS Frandos handled my express entry with absolute professionalism. Their attention to detail meant my application was approved without a single request for additional documents.', img: test1Img },
              { name: 'Abena Osei', role: 'Student, UK', text: 'From securing my university admission to guiding me through the intensive Tier 4 visa process, they were exceptional. I am now living my dream in London.', img: test2Img },
              { name: 'David Ansah', role: 'Business Executive, UAE', text: 'For corporate travel and premium visa services, there is no other agency I trust. They understand the urgency of business and deliver flawlessly every time.', img: test3Img },
            ].map((testimonial, i) => (
              <motion.div key={i} variants={fadeUpItem} className="bg-white p-8 rounded border border-border shadow-sm transition-shadow relative">
                <div className="absolute top-8 right-8 text-secondary opacity-20">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                </div>
                <div className="flex gap-1 text-secondary mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-serif">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.img} alt={testimonial.name} onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.jpg' }} className="w-14 h-14 rounded-full object-cover border-2 border-secondary/20" />
                  <div>
                    <h5 className="font-bold text-primary">{testimonial.name}</h5>
                    <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start"
          >
            <div className="md:col-span-2 md:sticky md:top-28">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif text-primary mb-4"
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                Clear answers for your journey ahead. If you don't find what you're looking for, feel free to reach out to our team.
              </motion.p>
            </div>

            <div className="md:col-span-3 space-y-4">
              {[
                { q: "How long does visa processing take?", a: "Processing times vary significantly based on the destination country, visa type, and current embassy backlogs. On average, tourist visas take 2-4 weeks, while work and student visas can take 1-3 months. We provide accurate timelines during consultation." },
                { q: "What documents do I need for a visa application?", a: "Standard requirements include a valid passport (6 months validity), passport-sized photos, proof of funds, travel itinerary, and accommodation details. Specific visas require additional documents like employment letters, admission letters, or police clearance. We provide a customized checklist." },
                { q: "Do you offer travel packages?", a: "Yes, we curate premium travel packages including flights, luxury hotel reservations, airport transfers, and customized tours for major global destinations." },
                { q: "How much does it cost?", a: "Our service fees depend on the complexity of the application and the service requested. We operate with complete transparency-all fees are discussed upfront during your initial consultation with no hidden charges." },
                { q: "Can you help with passport renewal?", a: "Absolutely. We offer expedited assistance for new passport acquisition, renewals, and other vital documents like biometric birth certificates to ensure you're travel-ready." },
                { q: "What countries do you cover for recruitment?", a: "Our primary recruitment corridors are Canada, the United Kingdom, USA, Germany, Australia, and the UAE, focusing on healthcare, IT, engineering, and hospitality sectors." },
                { q: "How do I get started?", a: "Simply fill out the contact form below or call our office to schedule your initial consultation. We'll assess your profile and map out the exact steps required." },
              ].map((faq, i) => (
                <Accordion type="single" collapsible key={i}>
                  <AccordionItem value={`item-${i}`} className="bg-[#F5F0E8] rounded px-6 border border-transparent">
                    <AccordionTrigger className="text-left text-base md:text-lg font-serif font-medium text-primary hover:text-secondary py-5 gap-4">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base pb-5 pt-0">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 13. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-background relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F5F0E8] hidden lg:block rounded"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Get In Touch</h2>
              <p className="text-muted-foreground text-lg mb-12">Visit our office or reach out to our team of experts. Your global journey begins with a single conversation.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary text-lg">Head Office</h5>
                    <p className="text-muted-foreground mt-1">Ashiaman, Near Tigo Office<br/>Greater Accra, Ghana</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary text-lg">Phone Lines</h5>
                    <div className="text-muted-foreground mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
                      <span>024-778-9031</span>
                      <span>059-873-7651</span>
                      <span>024-203-5562</span>
                      <span>059-825-6003</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
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
                  title="CS Frandos Office Location"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-12 rounded shadow-xl border border-border/50"
            >
              <h3 className="text-2xl font-serif text-primary mb-8 font-bold">Request a Consultation</h3>
              
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background h-12 border-border/60 focus-visible:ring-secondary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-medium">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background h-12 border-border/60 focus-visible:ring-secondary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-medium">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+233 24 000 0000" className="bg-background h-12 border-border/60 focus-visible:ring-secondary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={contactForm.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-medium">Service of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background h-12 border-border/60 focus:ring-secondary">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="visa">Visa Application</SelectItem>
                            <SelectItem value="jobs">International Recruitment / Jobs</SelectItem>
                            <SelectItem value="travel">Travel & Tour Packages</SelectItem>
                            <SelectItem value="passport">Passport & Document Assistance</SelectItem>
                            <SelectItem value="other">Other Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your goals or requirements..." 
                            className="bg-background min-h-[150px] resize-none border-border/60 focus-visible:ring-secondary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="xl" className="group w-full bg-primary text-white hover:bg-secondary hover:text-primary rounded-full mt-4 font-medium uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 shadow-md">
                    <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Send Message</span>
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Send Message</span>
                    </span>
                  </Button>
                </form>
              </Form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 14. INSIGHTS */}
      <section id="insights" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center mb-16"
          >
              <motion.h2 variants={fadeUpItem} className="text-4xl md:text-5xl font-serif text-primary mb-4">
              Latest From Our Desk
            </motion.h2>
            <motion.p variants={fadeUpItem} className="text-muted-foreground max-w-xl text-lg">
              Expert advice on visas, travel, and global career opportunities.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                tag: 'Visa Guide',
                title: 'UK Student Visa 2026: Step-by-Step Application Guide',
                summary: 'Everything you need to know about the Tier 4 visa process - from CAS letter to biometric appointment.',
                date: 'May 12, 2026',
                img: serviceVisaImg,
              },
              {
                tag: 'Travel',
                title: 'Top 5 Visa-Free Destinations for Ghanaian Passport Holders',
                summary: 'Plan your next getaway without the wait. These destinations welcome Ghanaians with visa-free or visa-on-arrival access.',
                date: 'Apr 28, 2026',
                img: serviceTravelImg,
              },
              {
                tag: 'Career',
                title: 'How African Professionals Can Land a Job in Canada',
                summary: 'From Express Entry to LMIA work permits - we break down the most viable pathways to building a career in Canada.',
                date: 'Apr 10, 2026',
                img: serviceJobsImg,
              },
            ].map((post, i) => (
              <motion.article
                key={i}
                variants={fadeUpItem}
                className="group flex flex-col border border-border/60 bg-white rounded overflow-hidden transition-all duration-300 hover:shadow-md hover:border-border"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.jpg' }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-7 pt-5">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-secondary font-semibold mb-3">
                    {post.tag}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3 leading-snug group-hover:text-secondary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-xs font-medium text-secondary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 15. FINAL CTA STRIP */}
      <section className="bg-gradient-to-r from-primary to-[#1A2C4A] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 font-bold">
            Your Journey Starts Here
          </h2>
          <Button size="xl" className="group bg-white text-primary hover:bg-secondary hover:text-primary rounded-full px-8 font-medium uppercase tracking-wider shadow-lg shadow-black/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5">
            <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
              <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Now</span>
              <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Now</span>
            </span>
          </Button>
        </div>
      </section>

      {/* 16. FOOTER */}
      <footer className="bg-primary pt-20 pb-10 text-white/70 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-1">
              <img src="/logo.png" alt="CS Frandos" className="h-10 w-auto block mb-6" />
              <p className="text-sm leading-relaxed mb-8 max-w-xs">
                A premium travel, visa, and international recruitment agency dedicated to unlocking borders and building global careers.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#about" className="hover:text-secondary transition-colors">About Us</a></li>
                <li><a href="#destinations" className="hover:text-secondary transition-colors">Destinations</a></li>
                <li><a href="#recruitment" className="hover:text-secondary transition-colors">Careers Abroad</a></li>
                <li><a href="#contact" className="hover:text-secondary transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#services" className="hover:text-secondary transition-colors">Visa Application</a></li>
                <li><a href="#services" className="hover:text-secondary transition-colors">Travel & Tour</a></li>
                <li><a href="#services" className="hover:text-secondary transition-colors">Ticketing & Hotel</a></li>
                <li><a href="#services" className="hover:text-secondary transition-colors">Passport Assistance</a></li>
                <li><a href="#services" className="hover:text-secondary transition-colors">Birth Certificates</a></li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <h4 className="text-white font-serif font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                  <span>Ashiaman, Near Tigo Office<br/>Greater Accra, Ghana</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span>024-778-9031</span><br/>
                    <span>059-873-7651</span>
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
            <p>&copy; {new Date().getFullYear()} CS Frandos Limited. All rights reserved.</p>
            <p>Designed for Global Excellence</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
