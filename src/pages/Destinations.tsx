import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MapPin, Star, ChevronRight, Globe, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { destinations } from '@/data/destinations';
import { Reveal } from '@/components/Reveal';
import SEO from '@/components/SEO';
import { breadcrumbSchema } from '@/lib/structuredData';
import { useCta } from '@/components/CtaModal';

const regions = [
  { name: 'Europe', color: 'bg-secondary/85 text-white border-secondary/50' },
  { name: 'Middle East', color: 'bg-accent/85 text-white border-accent/50' },
  { name: 'North America', color: 'bg-blue-600/85 text-white border-blue-500/50' },
];

const getRegion = (country: string) => {
  if (['France', 'UK', 'Netherlands'].includes(country)) return regions[0];
  if (['UAE'].includes(country)) return regions[1];
  return regions[2];
};

export default function Destinations() {
  const { open: openCta } = useCta()
  return (
    <Layout>
      <SEO
        title="Destinations"
        description="Explore CS Franddos handpicked travel destinations — Paris, London, Dubai, New York, Toronto, Amsterdam, and more."
        path="/destinations"
        jsonLd={breadcrumbSchema([{name: 'Home', url: 'https://cs-frandos.vercel.app'}, {name: 'Destinations', url: 'https://cs-frandos.vercel.app/destinations'}])}
      />
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={destinations[0].img}
          alt="Destinations"
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
              Explore the World
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              Our Destinations
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Handpicked travel packages across the globe - every detail taken care of, from visa to return.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Placement Destinations */}
      <section className="py-24 md:py-32 bg-accent-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `radial-gradient(circle at 25% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 50%, #5A3A78 0%, transparent 50%)`}} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Reveal y={30} duration={0.8} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Placement Destinations
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              We place skilled professionals with leading employers across these global markets.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                country: 'Canada',
                flag: '🇨🇦',
                code: 'CAN',
                pathways: ['Healthcare Leadership', 'Advanced Tech / AI', 'Engineering Services'],
              },
              {
                country: 'United States',
                flag: '🇺🇸',
                code: 'USA',
                pathways: ['Software & Cloud Systems', 'Clinical & Life Sciences', 'Strategic Management'],
              },
              {
                country: 'Germany',
                flag: '🇩🇪',
                code: 'DEU',
                pathways: ['Engineering & Automotive', 'Medical Specialists', 'Technical Trades'],
              },
              {
                country: 'Serbia',
                flag: '🇷🇸',
                code: 'SRB',
                pathways: ['IT & Software Development', 'Engineering & Manufacturing', 'Medical & Healthcare'],
              },
              {
                country: 'Gulf Countries',
                flag: '🇦🇪',
                code: 'GCC',
                pathways: ['Oil & Gas Engineering', 'Hospitality Management', 'Construction & Infrastructure'],
              },
            ].map((loc, i) => (
              <Reveal key={i} delay={i * 0.08} y={30} duration={0.8} className="bg-white/10 border border-white/20 rounded p-6 md:p-8 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 flex flex-col hover:-translate-y-1.5">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl leading-none">{loc.flag}</span>
                  <h3 className="text-xl font-serif font-bold text-white">{loc.country}</h3>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {loc.pathways.map((path, pi) => (
                    <li key={pi} className="flex items-center gap-2.5 text-white/85 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0" />
                      <span>{path}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                    {loc.code}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal y={30} duration={0.8} className="text-center mt-12">
            <Button variant="ctaGold" onClick={() => openCta('jobs')} className="h-11 shadow-md hover:-translate-y-0.5">
                Apply for Placement
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal y={30} duration={0.8} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
              Discover Beautiful Places Around the World
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From the romance of Paris to the energy of New York - choose your next adventure.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, i) => {
              const region = getRegion(dest.country);
              return (
                <Link key={i} href={`/destination/${dest.slug}`} className="block">
                  <Reveal
                    delay={i * 0.08}
                    y={30}
                    duration={0.8}
                    className="group bg-white border border-border/60 rounded overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-500 flex flex-col cursor-pointer h-full hover:-translate-y-2"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <img
                        src={dest.img}
                        alt={dest.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                      {/* Region badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm ${region.color}`}>
                          {region.name}
                        </span>
                      </div>
                      {/* Rating pill */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-primary/70 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1">
                        <Star size={11} className="fill-secondary text-secondary" />
                        <span className="text-white text-[11px] font-semibold">{dest.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-2">
                        <MapPin size={11} />
                        {dest.country}
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                        {dest.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
                        {dest.description}
                      </p>

                      {/* Stats row */}
                      <div className="flex items-center justify-between mb-5 pt-4 border-t border-border/40">
                        <div>
                          <span className="text-xl font-serif font-bold text-primary">{dest.price}</span>
                          <span className="text-muted-foreground text-xs ml-1">/ {dest.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star size={11} className="fill-secondary text-secondary" />
                          <span>{dest.reviews.toLocaleString()} reviews</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{dest.highlights.length} highlights</span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-accent group-hover/link:gap-2.5 transition-all duration-300">
                          View Details <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </Reveal>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-16 bg-accent-light relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: '40+', label: 'Countries Served' },
              { num: '1000+', label: 'Happy Travelers' },
              { num: '674', label: 'Visas Approved' },
              { num: '6', label: 'Signature Packages' },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i >= 2 ? 'md:border-l border-accent/20 md:pl-12' : ''} ${i === 1 ? 'border-l border-accent/20 pl-8 md:pl-0 md:border-l-0' : ''}`}>
                <div className="text-4xl md:text-5xl font-serif text-secondary mb-2">{stat.num}</div>
                <span className="text-white/70 text-sm md:text-base font-medium tracking-wide uppercase">{stat.label}</span>
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
              Not Sure Which Destination?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 text-lg">
              Talk to our travel experts - we'll match you with the perfect package.
            </p>
            <Button variant="ctaGold" onClick={() => openCta('travel')} className="h-12 shadow-md hover:-translate-y-0.5">
                Book a Consultation
            </Button>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
