import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  Plane, Briefcase, FileCheck, Landmark, ArrowRight,
  Check, Clock, Award, Users, ShieldCheck, Globe,
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import SEO from '@/components/SEO';
import { breadcrumbSchema } from '@/lib/structuredData';
import { useCta } from '@/components/CtaModal';
import serviceTravelImg from '@assets/generated_images/service-travel.webp';
import serviceJobsImg from '@assets/generated_images/service-jobs.webp';
import serviceVisaImg from '@assets/generated_images/service-visa.webp';
import servicePassportImg from '@assets/generated_images/service-passport.webp';

const services = [
  {
    icon: Plane,
    title: 'Travel & Tour',
    tag: 'Luxury Packages',
    img: serviceTravelImg,
    description:
      'We curate unforgettable travel experiences across the globe - from luxury getaways in Dubai and Paris to cultural tours in Amsterdam and London. Every itinerary is handcrafted to match your preferences, budget, and schedule.',
    features: [
      'Premium hotel reservations & accommodation',
      'Airport transfers & local transportation',
      'Guided tours & curated experiences',
      'Flight booking & ticketing',
      'Travel insurance coordination',
      '24/7 on-trip support',
    ],
    process: [
      'Tell us your destination & preferences',
      'We design a custom itinerary',
      'Confirm & make secure payment',
      'Receive your travel documents & depart',
    ],
  },
  {
    icon: Briefcase,
    title: 'Jobs Abroad',
    tag: 'International Recruitment',
    img: serviceJobsImg,
    description:
      'We connect skilled African professionals with leading employers across North America, Europe, and the Gulf. Our end-to-end recruitment service covers job matching, document preparation, visa sponsorship coordination, and pre-departure orientation.',
    features: [
      'CV & professional profile optimization',
      'Job matching with vetted international employers',
      'Interview preparation & coaching',
      'Work visa & permit coordination',
      'Pre-departure orientation',
      'Relocation support & settlement guidance',
    ],
    process: [
      'Submit your CV & career aspirations',
      'We match you with suitable openings',
      'Interview preparation & employer liaison',
      'Visa processing & relocation coordination',
    ],
  },
  {
    icon: FileCheck,
    title: 'Visa Application',
    tag: '98% Approval Rate',
    img: serviceVisaImg,
    description:
      'Our visa consultants provide expert guidance across all visa categories - tourist, student, work, business, and family reunification. We meticulously review every detail to ensure your application meets consular requirements.',
    features: [
      'Tourist & visitor visa processing',
      'Student visa (Tier 4, F-1, etc.) assistance',
      'Work permit & business visa applications',
      'Family sponsorship & reunification visas',
      'Document translation & notarization',
      'Application tracking & embassy follow-up',
    ],
    process: [
      'Initial consultation & eligibility assessment',
      'Document checklist & collection',
      'Application form completion & review',
      'Submission & embassy follow-up',
    ],
  },
  {
    icon: Landmark,
    title: 'Passport & Documents',
    tag: 'Document Services',
    img: servicePassportImg,
    description:
      'We assist with the acquisition and renewal of passports, birth certificates, and other essential travel documents. Our streamlined process saves you time and eliminates the stress of navigating government agencies.',
    features: [
      'New passport application (adult & child)',
      'Passport renewal & replacement',
      'Biometric birth certificate acquisition',
      'Document authentication & legalization',
      'Name change & amendment processing',
      'Emergency travel document assistance',
    ],
    process: [
      'Submit required documents & photos',
      'We verify & prepare your application',
      'Lodge application at relevant authority',
      'Collect & deliver your document',
    ],
  },
];

const whyUs = [
  {
    icon: Award,
    title: '15+ Years of Excellence',
    desc: 'Decades of trusted service with a proven track record of success.',
  },
  {
    icon: ShieldCheck,
    title: '98% Visa Approval Rate',
    desc: 'Industry-leading success rate through meticulous application handling.',
  },
  {
    icon: Users,
    title: '5000+ Clients Served',
    desc: 'Thousands of successful journeys across 40+ countries worldwide.',
  },
  {
    icon: Clock,
    title: 'End-to-End Support',
    desc: 'We handle every detail so you can focus on your journey ahead.',
  },
];

export default function Services() {
  const { open: openCta } = useCta()
  return (
    <Layout>
      <SEO
        title="Services"
        description="Explore CS Franddos services — visa applications, travel & tour packages, ticketing, passport assistance, birth certificates, and international recruitment."
        path="/services"
        jsonLd={breadcrumbSchema([{name: 'Home', url: 'https://cs-frandos.vercel.app'}, {name: 'Services', url: 'https://cs-frandos.vercel.app/services'}])}
      />
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={serviceTravelImg}
          alt="CS Franddos Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="container mx-auto px-6 md:px-12"
          >
            <div className="flex items-center gap-2 text-secondary text-sm font-medium tracking-widest uppercase mb-3">
              <Globe size={14} />
              What We Do
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              Our Services
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Comprehensive travel, visa, recruitment, and document services designed to unlock global opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alternating Service Cards */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal y={30} duration={0.8} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
              Everything You Need Under One Roof
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Four core services built around one mission - helping you cross borders with confidence.
            </p>
          </Reveal>

          <div className="space-y-16 md:space-y-24">
            {services.map((service, idx) => (
              <Reveal key={idx} y={30} duration={0.8} className="bg-white border border-border/60 rounded shadow-sm hover:shadow-lg hover:border-accent/20 transition-all duration-500 overflow-hidden hover:-translate-y-1">
                <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Image */}
                  <div className="lg:w-1/2 relative min-h-[320px] md:min-h-[400px] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-primary/30 lg:via-transparent lg:to-transparent" />
                    <div className="absolute bottom-5 left-5">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-white border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm bg-primary/60">
                        {service.tag}
                      </span>
                    </div>
                    <div className="absolute top-5 left-5 w-12 h-12 rounded bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center text-accent">
                      <service.icon strokeWidth={1.5} size={22} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <Reveal y={30} duration={0.8}>
                      <h2 className="text-2xl md:text-3xl font-serif text-primary mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                        {service.description}
                      </p>
                    </Reveal>

                    <Reveal y={30} duration={0.8} delay={0.08} className="mb-8">
                      <h3 className="text-[10px] font-bold tracking-widest uppercase text-accent mb-4">
                        What's Included
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.features.map((feat, fi) => (
                          <div key={fi} className="flex items-start gap-2.5">
                            <Check size={13} className="text-secondary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground text-sm">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </Reveal>

                    <Reveal y={30} duration={0.8} delay={0.16}>
                      <h3 className="text-[10px] font-bold tracking-widest uppercase text-accent mb-4">
                        How It Works
                      </h3>
                      <div className="space-y-3">
                        {service.process.map((step, si) => (
                          <div key={si} className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                              <span className="text-[9px] font-bold text-secondary">{si + 1}</span>
                            </span>
                            <span className="text-foreground text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </Reveal>

                    <Reveal y={30} duration={0.8} delay={0.24} className="mt-8 pt-6 border-t border-border/40">
                      <Link href="/#contact">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all duration-300 cursor-pointer">
                          Get Started <ArrowRight size={14} />
                        </span>
                      </Link>
                    </Reveal>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 md:py-32 bg-accent-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `radial-gradient(circle at 25% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 50%, #5A3A78 0%, transparent 50%)`}} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Reveal y={30} duration={0.8} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Why Choose CS Franddos?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Trusted by thousands for over a decade of excellence.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                y={30}
                duration={0.8}
                className="bg-white/5 border border-white/10 rounded p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={24} className="text-secondary" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-[#1A2C4A] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Reveal y={30} duration={0.8}>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 text-lg">
              Book a consultation with our team and take the first step toward your global journey.
            </p>
            <Button variant="ctaGold" onClick={() => openCta()} className="h-12 shadow-md hover:-translate-y-0.5">
                Book a Consultation
            </Button>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
