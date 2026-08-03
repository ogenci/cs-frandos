import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  Globe, Award, Users, ShieldCheck, Target, Eye, Heart,
  ArrowRight,
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import SEO from '@/components/SEO';
import { breadcrumbSchema } from '@/lib/structuredData';
import { useCta } from '@/components/CtaModal';
import test1Img from '@assets/generated_images/testimonial1.webp';
import serviceTravelImg from '@assets/generated_images/service-travel.webp';
import serviceJobsImg from '@assets/generated_images/service-jobs.webp';

const values = [
  {
    icon: ShieldCheck,
    title: 'Integrity',
    desc: 'We operate with complete transparency. Every fee, timeline, and requirement is communicated upfront - no hidden agendas.',
  },
  {
    icon: Award,
    title: 'Excellence',
    desc: 'With a 98% visa approval rate and thousands of successful placements, our track record speaks for itself.',
  },
  {
    icon: Users,
    title: 'People First',
    desc: 'Every client is a story waiting to unfold. We treat each application as if it were our own family\'s future.',
  },
  {
    icon: Target,
    title: 'Precision',
    desc: 'Meticulous attention to detail defines our work - from document preparation to embassy liaison.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    desc: 'Partnerships across 40+ countries ensure our clients access the best opportunities worldwide.',
  },
  {
    icon: Heart,
    title: 'Compassion',
    desc: 'We understand the courage it takes to pursue opportunities abroad, and we support every step of the way.',
  },
];

const milestones = [
  { year: '2017', title: 'Founded', desc: 'CS Franddos Limited established in Accra, Ghana with a vision to bridge borders.' },
  { year: '2019', title: 'First 100 Clients', desc: 'Reached 100 successful visa applications and travel bookings within the first two years.' },
  { year: '2021', title: 'Recruitment Launch', desc: 'Expanded into international recruitment, placing first cohort of professionals in Canada.' },
  { year: '2023', title: '1000+ Milestone', desc: 'Celebrated 1,000 happy clients and expanded services to include document assistance.' },
  { year: '2025', title: '40+ Countries', desc: 'Now serving clients across 40+ countries with a 98% visa approval rate.' },
  { year: '2026', title: 'Looking Ahead', desc: 'Continuing to grow our global footprint and open new doors for African talent.' },
];

export default function About() {
  const { open: openCta } = useCta()
  return (
    <Layout>
      <SEO
        title="About"
        description="Learn about CS Franddos Limited — a premium travel, visa, and international recruitment agency based in Ashiaman, Ghana."
        path="/about"
        jsonLd={breadcrumbSchema([{name: 'Home', url: 'https://csfranddos.com'}, {name: 'About', url: 'https://csfranddos.com/about'}])}
      />
      <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <img
          src={serviceTravelImg}
          alt="About CS Franddos"
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
              Who We Are
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              About CS Franddos
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              A premium travel, visa, and international recruitment agency dedicated to unlocking borders and building global careers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <Reveal y={30} duration={0.8}>
              <div className="w-14 h-14 rounded bg-secondary/20 flex items-center justify-center text-secondary mb-6">
                <Target size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                To provide seamless, reliable, and professional travel, visa, and recruitment services that empower individuals and families to pursue global opportunities with confidence. We bridge the gap between ambition and reality - one successful application at a time.
              </p>
            </Reveal>

            <Reveal y={30} duration={0.8} delay={0.08}>
              <div className="w-14 h-14 rounded bg-accent/20 flex items-center justify-center text-accent mb-6">
                <Eye size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                Our Vision
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                To become the most trusted gateway for African professionals and travelers seeking global opportunities - recognized for integrity, excellence, and the life-changing impact we deliver across every border we help our clients cross.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="relative py-28 md:py-36 bg-accent-light overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `radial-gradient(circle at 25% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 50%, #5A3A78 0%, transparent 50%)`}} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            <Reveal y={30} duration={0.8} className="relative lg:w-1/2 min-h-[300px] md:min-h-[400px] overflow-hidden rounded-lg">
              <img
                src="/Mr Francis.webp"
                alt="CEO - CS Franddos Limited"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-secondary text-primary text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 shadow-lg">
                CEO & Founder
              </div>
            </Reveal>

            <div className="lg:w-1/2 flex items-center px-8 md:px-14 py-12 md:py-16">
              <div className="max-w-xl">
                <Reveal y={30} duration={0.8} delay={0.08}>
                  <span className="text-secondary text-sm font-bold tracking-[0.2em] uppercase inline-block mb-3">
                    A Message from Our Founder
                  </span>
                </Reveal>
                <Reveal y={30} duration={0.8} delay={0.16}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
                    "We don't just process paperwork -<br />
                    <span className="text-secondary">we open doors to new beginnings.</span>"
                  </h2>
                </Reveal>
                <Reveal y={30} duration={0.8} delay={0.24}>
                  <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
                    At CS Franddos, every visa approved, every ticket booked, and every
                    job secured is a family's story changed for the better. Our team works
                    tirelessly to ensure your journey - whether academic, professional, or
                    personal - is seamless from start to finish.
                  </p>
                </Reveal>
                <Reveal y={30} duration={0.8} delay={0.32} className="mt-8">
                  <div className="relative pl-5 border-l-2 border-secondary">
                    <p className="text-secondary font-bold font-serif text-2xl md:text-3xl tracking-wider uppercase">Francis Addo Agbanawo</p>
                    <p className="text-white/60 text-sm tracking-wide mt-0.5">CEO & Founder, CS Franddos Limited</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal y={30} duration={0.8} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The principles that guide everything we do.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                y={30}
                duration={0.8}
                className="bg-white border border-border/60 rounded p-8 hover:shadow-md hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center text-accent mb-5">
                  <value.icon strokeWidth={1.5} size={22} />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-accent-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `radial-gradient(circle at 25% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 50%, #5A3A78 0%, transparent 50%)`}} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <Reveal y={30} duration={0.8} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Our Journey
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              From a small Accra office to serving clients across 40+ countries.
            </p>
          </Reveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-16 left-[calc(16.666%-24px)] right-[calc(16.666%-24px)] h-px bg-gradient-to-r from-secondary/0 via-secondary/40 to-secondary/0 hidden lg:block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((m, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.08}
                  y={30}
                  duration={0.8}
                  className="bg-white/5 border border-white/10 rounded p-6 md:p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-center flex flex-col items-center"
                >
                  <span className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2 leading-none">
                    {m.year}
                  </span>
                  <div className="w-8 h-0.5 bg-secondary/40 mb-4" />
                  <h3 className="text-lg font-serif font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{m.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: '9+', label: 'Years in Business' },
              { num: '5,678', label: 'Clients Served' },
              { num: '674', label: 'Visas Approved' },
              { num: '40+', label: 'Countries Served' },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i >= 2 ? 'md:border-l border-accent/20 md:pl-12' : ''} ${i === 1 ? 'border-l border-accent/20 pl-8 md:pl-0 md:border-l-0' : ''}`}>
                <div className="text-4xl md:text-5xl font-serif text-secondary mb-2">{stat.num}</div>
                <span className="text-muted-foreground text-sm md:text-base font-medium tracking-wide uppercase">{stat.label}</span>
              </div>
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 text-lg">
              Join thousands of clients who have trusted CS Franddos with their global ambitions.
            </p>
            <Button variant="ctaGold" onClick={() => openCta()} className="h-12 shadow-md hover:-translate-y-0.5">
                Start Your Journey
            </Button>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
