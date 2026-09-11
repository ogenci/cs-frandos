import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ShieldCheck, Mail, Phone, MapPin, ArrowRight, CalendarClock } from 'lucide-react';
import Layout from '@/components/Layout';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import { breadcrumbSchema } from '@/lib/structuredData';
import { useCta } from '@/components/CtaModal';
import serviceTravelImg from '@assets/generated_images/service-travel.webp';

const sections = [
  {
    id: 'information-we-collect',
    number: '01',
    title: 'Information We Collect',
  },
  {
    id: 'how-we-use-your-information',
    number: '02',
    title: 'How We Use Your Information',
  },
  {
    id: 'how-we-share-your-information',
    number: '03',
    title: 'How We Share Your Information',
  },
  {
    id: 'data-retention',
    number: '04',
    title: 'Data Retention',
  },
  {
    id: 'your-rights',
    number: '05',
    title: 'Your Rights',
  },
  {
    id: 'data-security',
    number: '06',
    title: 'Data Security',
  },
  {
    id: 'contact-us',
    number: '07',
    title: 'Contact Us',
  },
  {
    id: 'changes-to-this-policy',
    number: '08',
    title: 'Changes to This Policy',
  },
];

const contactNumbers = [
  { label: 'Main Branch - Ashiaman', numbers: ['024 778 9031', '024 203 5562', '059 873 7651', '059 825 6003'] },
  { label: 'Asesewa Branch', numbers: ['0556 972 419', '0559 858 918'] },
];

export default function PrivacyPolicy() {
  const { open: openCta } = useCta();

  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="Learn how CS Franddos Limited collects, uses, and protects your personal information when you apply through our forms, WhatsApp, or in person."
        path="/privacy"
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: 'https://csfranddos.com' },
          { name: 'Privacy Policy', url: 'https://csfranddos.com/privacy' },
        ])}
      />

      {/* Hero */}
      <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <img
          src={serviceTravelImg}
          alt="Privacy Policy CS Franddos"
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
              <ShieldCheck size={14} />
              Your Privacy, Our Commitment
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              Privacy Policy
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              How CS Franddos Limited collects, uses, and protects your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] gap-12 lg:gap-16">

            {/* Table of contents */}
            <aside className="hidden lg:block">
              <div className="lg:sticky lg:top-28">
                <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-4">
                  On This Page
                </p>
                <ul className="space-y-3 border-l border-border/60">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-baseline gap-3 -ml-px border-l-2 border-transparent hover:border-accent pl-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span className="text-[10px] font-bold text-accent/60 group-hover:text-accent">
                          {s.number}
                        </span>
                        <span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 bg-accent-light/10 border border-accent/15 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarClock size={15} className="text-secondary" />
                    <span className="text-xs font-bold text-primary">Last Updated</span>
                  </div>
                  <p className="text-sm text-muted-foreground">September 11, 2026</p>
                </div>
              </div>
            </aside>

            {/* Policy body */}
            <div className="min-w-0">
              <Reveal y={24} duration={0.7} once>
                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-strong:text-primary prose-li:marker:text-accent">
                  <div className="not-prose flex items-center gap-2 text-sm text-muted-foreground mb-8 lg:hidden">
                    <CalendarClock size={14} className="text-secondary" />
                    Last updated: September 11, 2026
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    CS FRANDDOS LTD ("CS Franddos," "we," "us," or "our") provides travel, visa, immigration,
                    passport, and work-abroad recruitment services. This Privacy Policy explains what personal
                    information we collect when you apply through our online forms, WhatsApp, or in person, how we
                    use it, and your rights regarding that information.
                  </p>

                  <div className="not-prose bg-accent/5 border-l-4 border-accent rounded p-5 my-8">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      By submitting an application or contacting us through our forms or WhatsApp, you agree to the
                      terms of this Privacy Policy.
                    </p>
                  </div>

                  {/* 01 */}
                  <h2 id="information-we-collect">
                    <span className="text-accent mr-2 text-base align-middle font-sans font-bold tracking-wider">01</span>
                    Information We Collect
                  </h2>
                  <p>
                    When you apply through our "Work Abroad List" form or contact us directly, we may collect:
                  </p>
                  <ul>
                    <li>Full name</li>
                    <li>Phone number / WhatsApp number</li>
                    <li>Passport status (e.g., whether you currently hold a valid passport)</li>
                    <li>Preferred country or city of interest for work opportunities</li>
                    <li>
                      Any additional information you voluntarily share with us during follow-up conversations,
                      screening, or the application process (e.g., age, work experience, education, documents needed
                      for visa or travel processing)
                    </li>
                  </ul>
                  <p>
                    If you proceed with our recruitment or documentation services, we may also collect copies of
                    identification documents, passport details, and other information required to process visa,
                    passport, or travel applications on your behalf.
                  </p>

                  {/* 02 */}
                  <h2 id="how-we-use-your-information">
                    <span className="text-accent mr-2 text-base align-middle font-sans font-bold tracking-wider">02</span>
                    How We Use Your Information
                  </h2>
                  <p>We use the information you provide to:</p>
                  <ul>
                    <li>Contact you regarding work-abroad opportunities that may match your profile</li>
                    <li>Assess your eligibility for specific opportunities or destinations</li>
                    <li>Process passport, visa, and travel documentation on your behalf, where you have engaged us to do so</li>
                    <li>Communicate with you via WhatsApp, phone, or other contact methods you provide</li>
                    <li>Maintain records of applicants for our work-abroad list</li>
                    <li>Improve and operate our services</li>
                  </ul>

                  {/* 03 */}
                  <h2 id="how-we-share-your-information">
                    <span className="text-accent mr-2 text-base align-middle font-sans font-bold tracking-wider">03</span>
                    How We Share Your Information
                  </h2>
                  <p>
                    We do not sell your personal information. We may share your information with:
                  </p>
                  <ul>
                    <li>
                      <strong>Employers, recruitment partners, or government/consular authorities</strong>, where
                      necessary to process a specific work opportunity, visa, or travel document on your behalf.
                    </li>
                    <li>
                      <strong>Service providers</strong> who help us operate (e.g., form or CRM tools), under
                      confidentiality obligations.
                    </li>
                    <li><strong>Legal authorities</strong>, if required by law.</li>
                  </ul>
                  <p>We do not share your information with unrelated third parties for marketing purposes.</p>

                  {/* 04 */}
                  <h2 id="data-retention">
                    <span className="text-accent mr-2 text-base align-middle font-sans font-bold tracking-wider">04</span>
                    Data Retention
                  </h2>
                  <p>
                    We retain your information for as long as necessary to provide our services, respond to your
                    application, and comply with legal or record-keeping obligations. You may request that we delete
                    your information at any time, subject to any legal or contractual retention requirements (see
                    Section 6).
                  </p>

                  {/* 05 */}
                  <h2 id="your-rights">
                    <span className="text-accent mr-2 text-base align-middle font-sans font-bold tracking-wider">05</span>
                    Your Rights
                  </h2>
                  <p>
                    Under Ghana's Data Protection Act, 2012 (Act 843), you have the right to:
                  </p>
                  <ul>
                    <li>Know what personal information we hold about you</li>
                    <li>Request a copy of your information</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your information, where applicable</li>
                    <li>Withdraw consent to be contacted at any time</li>
                  </ul>
                  <p>
                    To exercise any of these rights, contact us using the details in Section 7.
                  </p>

                  {/* 06 */}
                  <h2 id="data-security">
                    <span className="text-accent mr-2 text-base align-middle font-sans font-bold tracking-wider">06</span>
                    Data Security
                  </h2>
                  <p>
                    We take reasonable steps to protect your personal information from unauthorized access, loss, or
                    misuse. However, no method of transmission or storage is completely secure, and we cannot
                    guarantee absolute security.
                  </p>

                  {/* 07 */}
                  <h2 id="contact-us">
                    <span className="text-accent mr-2 text-base align-middle font-sans font-bold tracking-wider">07</span>
                    Contact Us
                  </h2>
                  <p>
                    If you have questions about this Privacy Policy or how your information is handled, contact us:
                  </p>
                  <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                    <div className="bg-white border border-border/60 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin size={16} className="text-accent" />
                        <p className="font-serif font-bold text-primary">CS FRANDDOS LTD</p>
                      </div>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                          <span className="block font-semibold text-primary">Main Branch</span>
                          Ashiaman, Near The AirtelTigo Office
                        </li>
                        <li>
                          <span className="block font-semibold text-primary">Asesewa Branch</span>
                          Near the Police Station
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white border border-border/60 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <Phone size={16} className="text-accent" />
                        <p className="font-serif font-bold text-primary">Phone</p>
                      </div>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {contactNumbers.map((group) => (
                          <li key={group.label}>
                            <span className="block font-semibold text-primary">{group.label}</span>
                            {group.numbers.join(' / ')}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white border border-border/60 rounded-lg p-6 shadow-sm sm:col-span-2">
                      <div className="flex items-center gap-2 mb-4">
                        <Mail size={16} className="text-accent" />
                        <p className="font-serif font-bold text-primary">Email</p>
                      </div>
                      <a
                        href="mailto:csfranddosltd@gmail.com"
                        className="text-sm text-accent font-medium hover:underline"
                      >
                        csfranddosltd@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* 08 */}
                  <h2 id="changes-to-this-policy">
                    <span className="text-accent mr-2 text-base align-middle font-sans font-bold tracking-wider">08</span>
                    Changes to This Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time. The "Last updated" date at the top of this
                    page reflects the most recent revision. Continued use of our services after changes are posted
                    constitutes acceptance of the updated policy.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-[#1A2C4A] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Reveal y={30} duration={0.8}>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 font-bold">
              Questions About Your Data?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 text-lg">
              Reach out to our team - we're happy to explain how we handle your information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button variant="ctaGold" className="h-12 shadow-md hover:-translate-y-0.5">
                  Contact Us <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-12 border-white/30 text-white hover:bg-white/10 hover:text-white"
                onClick={() => openCta()}
              >
                Start Your Journey
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}