import { motion } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { MapPin, Star, Check } from 'lucide-react';
import { destinations } from '@/data/destinations';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import SEO from '@/components/SEO';
import { breadcrumbSchema } from '@/lib/structuredData';
import { useCta } from '@/components/CtaModal';

export default function Destination() {
  const params = useParams();
  const { open: openCta } = useCta()
  const dest = destinations.find((d) => d.slug === params?.slug);

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <SEO title="Destination Not Found" path={params?.slug ? `/destination/${params.slug}` : '/destination'} />
        <div className="text-center">
          <h1 className="text-4xl font-serif text-primary mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground mb-6">The destination you're looking for doesn't exist.</p>
          <Link href="/">
            <Button variant="cta" className="px-6">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <SEO
        title={dest.name}
        description={`Travel to ${dest.name} with CS Franddos. ${dest.description?.substring(0, 150)}`}
        path={`/destination/${dest.slug}`}
        image={dest.img}
        jsonLd={breadcrumbSchema([{name: 'Home', url: 'https://cs-frandos.vercel.app'}, {name: 'Destinations', url: 'https://cs-frandos.vercel.app/destinations'}, {name: dest.name, url: `https://cs-frandos.vercel.app/destination/${dest.slug}`}])}
      />
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={dest.img}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="container mx-auto px-6 md:px-12"
          >
            <div className="flex items-center gap-2 text-secondary text-sm font-medium tracking-widest uppercase mb-3">
              <MapPin size={14} />
              {dest.country}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              {dest.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-secondary text-secondary" />
                <span className="font-medium">{dest.rating.toFixed(1)}/5</span>
                <span className="text-white/50">({dest.reviews.toLocaleString()}+ reviews)</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{dest.price} / {dest.duration}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Reveal y={30} duration={0.8}>
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">About This Package</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12">
                  {dest.description}
                </p>
              </Reveal>

              {/* Highlights */}
              <Reveal y={30} duration={0.8} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-serif text-primary mb-6">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dest.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-secondary" />
                      </div>
                      <span className="text-muted-foreground text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Itinerary */}
              <Reveal y={30} duration={0.8}>
                <h2 className="text-2xl md:text-3xl font-serif text-primary mb-8">Itinerary</h2>
                <div className="relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
                  {dest.itinerary.map((item, i) => (
                    <div key={i} className="flex gap-5 pb-8 last:pb-0 relative">
                      <div className="relative z-10 mt-1 w-6 h-6 rounded-full bg-secondary border-2 border-white flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold text-primary">{i + 1}</span>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <span className="text-xs font-bold tracking-widest uppercase text-secondary">{item.day}</span>
                        <h3 className="text-lg font-serif font-bold text-primary mt-0.5">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <Reveal y={30} duration={0.8} className="lg:col-span-1">
              <div className="sticky top-28">
                {/* Price Card */}
                <div className="bg-white rounded border border-border p-6 mb-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl md:text-5xl font-serif font-bold text-primary">{dest.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">/ {dest.duration}</span>
                  </div>
                  <Button variant="cta" onClick={() => openCta('travel')} className="w-full h-12 shadow-sm mb-3">
                      Book This Package
                    </Button>
                  <p className="text-xs text-center text-muted-foreground">No hidden fees • Best price guaranteed</p>
                </div>

                {/* What's Included */}
                <div className="bg-white rounded border border-border p-6">
                  <h3 className="text-lg font-serif font-bold text-primary mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {dest.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={14} className="text-secondary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Info */}
                <div className="mt-6 bg-accent/5 rounded border border-accent/10 p-6">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-accent mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Destination</span>
                      <span className="font-medium text-primary">{dest.name}, {dest.country}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-primary">{dest.duration}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-medium text-primary">{dest.rating.toFixed(1)}/5 ({dest.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium text-primary">{dest.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-accent-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `radial-gradient(circle at 25% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 50%, #5A3A78 0%, transparent 50%)`}} />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <Reveal y={30} duration={0.8}>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Ready to Book Your Trip?</h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              Contact our team today and let us handle everything - from visas to accommodation.
            </p>
            <Button variant="ctaGold" onClick={() => openCta()} className="h-12 shadow-md hover:-translate-y-0.5">
                Get Started Now
            </Button>
          </Reveal>
        </div>
      </section>

    </Layout>
  );
}
