import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Briefcase, MapPin, Clock, Calendar} from 'lucide-react'
import Layout from '@/components/Layout'
import {Reveal} from '@/components/Reveal'
import {PortableText, type TypedObject} from '@portabletext/react'
import SEO from '@/components/SEO'
import {breadcrumbSchema} from '@/lib/structuredData'
import {getVacancies} from '@/lib/sanity'
import heroImg from '@assets/generated_images/service-travel.webp'

interface Vacancy {
  _id: string
  title: string
  location: string
  type: string
  department: string
  description: TypedObject[]
  requirements: TypedObject[]
  deadline: string
  status: string
}

export default function Vacancies() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    getVacancies().then((data) => {
      setVacancies(data)
      setLoading(false)
    })
  }, [])

  return (
    <Layout>
      <SEO
        title="Vacancies"
        description="Explore career opportunities at CS Franddos. Join our growing global team in travel, visa, and recruitment services."
        path="/vacancies"
        jsonLd={breadcrumbSchema([{name: 'Home', url: 'https://cs-frandos.vercel.app'}, {name: 'Vacancies', url: 'https://cs-frandos.vercel.app/vacancies'}])}
      />
      <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Vacancies"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 z-10">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
            className="container mx-auto px-6 md:px-12"
          >
            <div className="flex items-center gap-2 text-secondary text-sm font-medium tracking-widest uppercase mb-3">
              <Briefcase size={14} />
              Join Our Team
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              Vacancies
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Explore career opportunities at CS Frandos and become part of a growing global team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal y={24} duration={0.6} once className="mb-14">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Open Positions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {loading
                ? 'Loading...'
                : vacancies.length === 0
                  ? 'No open vacancies at this time. Check back soon!'
                  : `${vacancies.length} position${vacancies.length > 1 ? 's' : ''} available`}
            </p>
          </Reveal>

          <div className="space-y-6">
            {vacancies.map((vacancy, i) => (
              <Reveal
                key={vacancy._id}
                delay={(i % 4) * 0.08}
                y={24}
                duration={0.55}
                className="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpanded(expanded === vacancy._id ? null : vacancy._id)}
                  className="w-full text-left p-6 md:p-8 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-serif text-primary font-bold mb-2">{vacancy.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {vacancy.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-secondary" />
                            {vacancy.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} className="text-secondary" />
                          {vacancy.type}
                        </span>
                        {vacancy.department && (
                          <span>{vacancy.department}</span>
                        )}
                        {vacancy.deadline && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-secondary" />
                            Deadline: {new Date(vacancy.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                        {expanded === vacancy._id ? 'Collapse' : 'View Details'}
                      </span>
                      <motion.svg
                        animate={{rotate: expanded === vacancy._id ? 180 : 0}}
                        transition={{duration: 0.2}}
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className="text-secondary"
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </div>
                  </div>
                </button>

                {expanded === vacancy._id && (
                  <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                    className="border-t border-border px-6 md:px-8 py-6 space-y-6"
                  >
                    {vacancy.description && (
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Description</h4>
                        <div className="text-muted-foreground text-sm leading-relaxed prose prose-sm max-w-none">
                          <PortableText value={vacancy.description} />
                        </div>
                      </div>
                    )}
                    {vacancy.requirements && (
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Requirements</h4>
                        <div className="text-muted-foreground text-sm leading-relaxed prose prose-sm max-w-none">
                          <PortableText value={vacancy.requirements} />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-2">
                      <Clock size={14} className="text-secondary" />
                      <span className="text-xs text-muted-foreground">
                        Apply before {vacancy.deadline ? new Date(vacancy.deadline).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}) : 'TBD'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}