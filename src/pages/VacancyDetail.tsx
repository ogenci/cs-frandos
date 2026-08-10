import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Link, useParams} from 'wouter'
import {ArrowRight, MapPin, Calendar, ChevronLeft, Briefcase, Users} from 'lucide-react'
import {PortableText} from '@portabletext/react'
import Layout from '@/components/Layout'
import {Button} from '@/components/ui/button'
import {Reveal} from '@/components/Reveal'
import VacancyCard from '@/components/VacancyCard'
import {useCta} from '@/components/CtaModal'
import SEO from '@/components/SEO'
import {breadcrumbSchema} from '@/lib/structuredData'
import {getSalaryParts} from '@/lib/salary'
import {getVacancyBySlug, getVacancies} from '@/lib/sanity'
import heroImg from '@assets/generated_images/service-travel.webp'

const COUNTRY_FLAGS: Record<string, string> = {
  Ghana: '🇬🇭',
  Canada: '🇨🇦',
  'United States': '🇺🇸',
  USA: '🇺🇸',
  'United Kingdom': '🇬🇧',
  UK: '🇬🇧',
  Germany: '🇩🇪',
  Serbia: '🇷🇸',
  UAE: '🇦🇪',
  Dubai: '🇦🇪',
  Australia: '🇦🇺',
  Netherlands: '🇳🇱',
  France: '🇫🇷',
  Italy: '🇮🇹',
  Spain: '🇪🇸',
}

function blockText(blocks: any[] | undefined): string {
  if (!blocks) return ''
  return blocks
    .map((block) => (block?.children || []).map((c: any) => c?.text || '').join(''))
    .join(' ')
    .trim()
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return 'Open'
  return new Date(deadline).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})
}

export default function VacancyDetail() {
  const params = useParams()
  const slug = params?.slug
  const { open: openCta } = useCta()
  const [vacancy, setVacancy] = useState<any>(null)
  const [others, setOthers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    getVacancyBySlug(slug).then((data) => {
      if (!data) {
        setNotFound(true)
      } else {
        setVacancy(data)
      }
      setLoading(false)
    })
    getVacancies().then((all) => {
      setOthers((all || []).filter((v) => v.slug?.current !== slug).slice(0, 3))
    })
  }, [slug])

  if (loading) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Loading...</p>
        </section>
      </Layout>
    )
  }

  if (notFound || !vacancy) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-primary mb-4">Vacancy Not Found</h1>
            <p className="text-muted-foreground mb-6">The position you're looking for is no longer available.</p>
            <Link href="/vacancies">
              <Button variant="cta" className="px-6 text-xs">
                Back to Vacancies
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    )
  }

  const country = vacancy.country || 'International'
  const flag = COUNTRY_FLAGS[vacancy.country] || ''
  const blurb = blockText(vacancy.description)
  const heroImage = vacancy.thumbnailUrl || heroImg
  const salaryParts = getSalaryParts(vacancy)

  return (
    <Layout>
      <SEO
        title={`${vacancy.title} — Vacancy`}
        description={blurb || `Apply now for the ${vacancy.title} position at CS Franddos.`}
        path={`/vacancies/${slug}`}
        image={vacancy.thumbnailUrl || undefined}
        jsonLd={breadcrumbSchema([
          {name: 'Home', url: 'https://csfranddos.com'},
          {name: 'Vacancies', url: 'https://csfranddos.com/vacancies'},
          {name: vacancy.title, url: `https://csfranddos.com/vacancies/${slug}`},
        ])}
      />

      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src={heroImage}
          alt={vacancy.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 z-10">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
            className="container mx-auto px-6 md:px-12"
          >
            <Link
              href="/vacancies"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-secondary text-sm font-medium tracking-wide transition-colors mb-4"
            >
              <ChevronLeft size={14} />
              Back to Vacancies
            </Link>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {vacancy.type && (
                <span className="bg-secondary/20 text-secondary border border-secondary/30 rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                  {vacancy.type}
                </span>
              )}
              {vacancy.department && (
                <span className="bg-white/10 text-white/80 border border-white/20 rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                  {vacancy.department}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-4 max-w-4xl leading-tight">
              {vacancy.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/70 text-sm">
              {vacancy.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {vacancy.location}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                {flag && <span>{flag}</span>}
                {country}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 xl:gap-12">

            <div className="lg:border-r lg:border-border/60 lg:pr-8 xl:pr-12 min-w-0">
              <Reveal y={24} duration={0.7} once>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                  <div className="rounded-xl border border-border/60 bg-white p-4 text-center shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Salary</p>
                    <p className="font-serif text-lg font-bold text-primary leading-tight">{salaryParts.main}</p>
                    {salaryParts.suffix && (
                      <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">{salaryParts.suffix}</p>
                    )}
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-4 text-center shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Country</p>
                    <p className="font-serif text-lg font-bold text-primary leading-tight">
                      {flag && <span className="mr-1.5">{flag}</span>}
                      {country}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 rounded-xl border border-border/60 bg-white p-4 text-center shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Deadline</p>
                    <p className="font-serif text-lg font-bold text-primary leading-tight">{formatDeadline(vacancy.deadline)}</p>
                  </div>
                </div>
              </Reveal>

              {vacancy.description && (
                <Reveal y={24} duration={0.7} once className="mb-10">
                  <h2 className="mb-3 flex items-center gap-2 text-2xl font-serif font-bold text-primary">
                    <Briefcase size={18} className="text-accent" />
                    Description
                  </h2>
                  <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-strong:text-primary leading-relaxed text-muted-foreground">
                    <PortableText value={vacancy.description} />
                  </div>
                </Reveal>
              )}

              {vacancy.requirements && (
                <Reveal y={24} duration={0.7} once className="mb-10">
                  <h2 className="mb-3 flex items-center gap-2 text-2xl font-serif font-bold text-primary">
                    <Users size={18} className="text-accent" />
                    Requirements
                  </h2>
                  <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-strong:text-primary leading-relaxed text-muted-foreground">
                    <PortableText value={vacancy.requirements} />
                  </div>
                </Reveal>
              )}

              {vacancy.benefits && (
                <Reveal y={24} duration={0.7} once>
                  <h2 className="mb-3 flex items-center gap-2 text-2xl font-serif font-bold text-primary">
                    <ArrowRight size={18} className="text-accent" />
                    Benefits
                  </h2>
                  <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-strong:text-primary leading-relaxed text-muted-foreground">
                    <PortableText value={vacancy.benefits} />
                  </div>
                </Reveal>
              )}
            </div>

            <div>
              <aside className="space-y-6 lg:sticky lg:top-28">
                <Reveal y={20} duration={0.6} once>
                  <div className="bg-primary rounded-xl p-6 text-white shadow-lg">
                    <p className="mb-1 text-[10px] font-bold tracking-widest uppercase text-secondary">Compensation</p>
                    <div className="mb-5">
                      <p className="font-serif text-2xl font-bold">{salaryParts.main}</p>
                      {salaryParts.suffix && (
                        <p className="mt-0.5 text-xs font-semibold text-white/60">{salaryParts.suffix}</p>
                      )}
                    </div>
                    <Button variant="ctaGold" className="w-full gap-2" onClick={() => openCta(vacancy.title)}>
                      Apply Now <ArrowRight size={14} />
                    </Button>
                    <p className="mt-3 text-xs text-center text-white/50">
                      Our team reviews applications and responds within 48 hours.
                    </p>
                  </div>
                </Reveal>

                <Reveal y={20} duration={0.6} once delay={0.05}>
                  <div className="space-y-3 rounded-xl border border-border/60 bg-white p-6 text-sm shadow-sm">
                    {vacancy.location && (
                      <div className="flex items-start gap-2.5">
                        <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</p>
                          <p className="font-medium text-primary">{vacancy.location}</p>
                        </div>
                      </div>
                    )}
                    {vacancy.type && (
                      <div className="flex items-start gap-2.5">
                        <Briefcase size={15} className="mt-0.5 shrink-0 text-accent" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Employment Type</p>
                          <p className="font-medium text-primary">{vacancy.type}</p>
                        </div>
                      </div>
                    )}
                    {vacancy.department && (
                      <div className="flex items-start gap-2.5">
                        <Users size={15} className="mt-0.5 shrink-0 text-accent" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Department</p>
                          <p className="font-medium text-primary">{vacancy.department}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2.5">
                      <Calendar size={15} className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Deadline</p>
                        <p className="font-medium text-primary">{formatDeadline(vacancy.deadline)}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal y={20} duration={0.6} once delay={0.1}>
                  <Link href="/vacancies">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all cursor-pointer">
                      <ArrowRight size={14} className="rotate-180" />
                      View all vacancies
                    </span>
                  </Link>
                </Reveal>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-20 md:py-28 bg-white border-t border-border/40">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <Reveal y={24} duration={0.6} once className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-2">Keep Exploring</p>
                <h2 className="text-3xl md:text-4xl font-serif text-primary">More Opportunities</h2>
              </div>
              <Link href="/vacancies" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all">
                View all <ArrowRight size={14} />
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {others.map((v, i) => (
                <VacancyCard key={v._id} vacancy={v} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}