import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock, Send, Globe, ShieldCheck,
  Facebook, Instagram, Twitter,
} from 'lucide-react';

import Layout from '@/components/Layout';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import SEO from '@/components/SEO';
import serviceTravelImg from '@assets/generated_images/service-travel.webp';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Head Office',
    lines: ['Ashiaman, Near Tigo Office', 'Greater Accra, Ghana'],
  },
  {
    icon: Phone,
    label: 'Phone Lines',
    lines: ['024 778 9031', '059 873 7651', '024 203 5562', '059 825 6003'],
    cols: 2,
  },
  {
    icon: Mail,
    label: 'Email',
    lines: ['csfranddosltd@gmail.com'],
  },
  {
    icon: Clock,
    label: 'Working Hours',
    lines: ['Monday – Friday: 8:00 AM – 5:00 PM', 'Saturday: 9:00 AM – 2:00 PM', 'Sunday: Closed'],
  },
];

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Contact"
        description="Get in touch with CS Franddos Limited. Visit our office in Ashiaman, Greater Accra, or call us for travel, visa, and recruitment inquiries."
        path="/contact"
      />
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={serviceTravelImg}
          alt="Contact CS Franddos"
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
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              Contact Us
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Your global journey begins with a single conversation. Reach out and let's make it happen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-light/30 hidden lg:block" />
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

            {/* Left - Info */}
            <div className="lg:col-span-5">
              <Reveal y={30} duration={0.8} className="mb-12">
                <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                  Let's Talk
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Whether you need a visa, a travel package, or career placement abroad - our team is ready to help.
                </p>
              </Reveal>

              <div className="space-y-8">
                {contactInfo.map((item, i) => (
                  <Reveal key={i} delay={i * 0.08} y={30} duration={0.8} className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h5 className="font-bold text-primary text-base mb-1.5">{item.label}</h5>
                      <div className={`text-muted-foreground text-sm leading-relaxed ${item.cols ? 'grid grid-cols-2 gap-x-4 gap-y-0.5' : ''}`}>
                        {item.lines.map((line, li) => (
                          <span key={li} className="block">{line}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Social */}
              <Reveal y={30} duration={0.8} className="mt-12 pt-8 border-t border-border/40">
                <h5 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Follow Us</h5>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: '#', label: 'Facebook' },
                    { icon: Instagram, href: '#', label: 'Instagram' },
                    { icon: Twitter, href: '#', label: 'Twitter' },
                  ].map((social, si) => (
                    <a
                      key={si}
                      href={social.href}
                      aria-label={social.label}
                      className="w-11 h-11 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      <social.icon size={17} />
                    </a>
                  ))}
                  <a
                    href="https://wa.me/233247789031"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-11 h-11 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                </div>
              </Reveal>

              {/* Trust */}
              <Reveal y={30} duration={0.8} className="mt-8 bg-accent/5 border border-accent/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck size={18} className="text-secondary" />
                  <span className="text-sm font-bold text-primary tracking-wide">Trusted Since 2010</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  CS Franddos Limited is a registered travel, visa, and recruitment agency serving clients across 40+ countries with a 98% visa approval rate.
                </p>
              </Reveal>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-7">
              <Reveal y={30} duration={0.8} className="bg-white border border-border/60 rounded-xl shadow-sm p-8 md:p-10 lg:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Send size={18} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-primary">Send a Message</h3>
                    <p className="text-muted-foreground text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <ContactForm />
                </form>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[400px] overflow-hidden">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.0825%2C5.645%2C-0.065%2C5.660&layer=mapnik&marker=5.652%2C-0.073"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="CS Franddos Office Location"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-5 py-3 border border-border/50">
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            <MapPin size={15} className="text-accent" />
            Ashiaman, Near Tigo Office - Greater Accra, Ghana
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-[#1A2C4A] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Reveal y={30} duration={0.8}>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 font-bold">
              Prefer to Call?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-6 text-lg">
              Speak directly with our team during business hours.
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-8">
              <a href="tel:+233247789031" className="text-2xl md:text-3xl font-serif text-secondary font-bold hover:text-white transition-colors">
                024 778 9031
              </a>
              <a href="tel:+233247789031" className="text-2xl md:text-3xl font-serif text-secondary font-bold hover:text-white transition-colors">
                024 203 5562
              </a>
              <a href="tel:+233247789031" className="text-2xl md:text-3xl font-serif text-secondary font-bold hover:text-white transition-colors">
                059 873 7651
              </a>
              <a href="tel:+233247789031" className="text-2xl md:text-3xl font-serif text-secondary font-bold hover:text-white transition-colors">
                059 825 6003
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
