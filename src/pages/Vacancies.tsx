import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Link} from 'wouter'
import {Briefcase, ArrowRight} from 'lucide-react'
import Layout from '@/components/Layout'
import {Reveal} from '@/components/Reveal'
import VacancyCard from '@/components/VacancyCard'
import {Button} from '@/components/ui/button'
import SEO from '@/components/SEO'
import {breadcrumbSchema} from '@/lib/structuredData'
import {getVacancies} from '@/lib/sanity'
import heroImg from '@assets/generated_images/service-travel.webp'

export default function Vacancies() {
  const [vacancies, setVacancies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
        jsonLd={breadcrumbSchema([{name: 'Home', url: 'https://csfranddos.com'}, {name: 'Vacancies', url: 'https://csfranddos.com/vacancies'}])}
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
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <Reveal y={24} duration={0.6} once>
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Open Positions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {loading
                  ? 'Loading...'
                  : vacancies.length === 0
                    ? 'No open vacancies at this time. Check back soon!'
                    : `${vacancies.length} position${vacancies.length > 1 ? 's' : ''} available`}
              </p>
            </Reveal>
            <Reveal y={20} duration={0.6} delay={0.1} once>
              <Link href="/contact">
                <Button variant="cta" size="sm" className="group gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  Can't find your role?
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </Reveal>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white animate-pulse">
                  <div className="h-52 bg-muted" />
                  <div className="flex flex-1 flex-col p-6 space-y-3">
                    <div className="h-4 w-1/2 bg-muted rounded" />
                    <div className="h-3 w-2/3 bg-muted rounded" />
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-10 w-full bg-muted rounded-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : vacancies.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white py-16 text-center text-muted-foreground">
              No open vacancies at this time. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {vacancies.map((vacancy, i) => (
                <VacancyCard key={vacancy._id} vacancy={vacancy} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}