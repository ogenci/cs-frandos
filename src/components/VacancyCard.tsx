import { MapPin, Calendar, ArrowRight, ChevronRight } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/Reveal'
import { useCta } from '@/components/CtaModal'
import { getSalaryParts } from '@/lib/salary'

interface VacancyCardProps {
  vacancy: any
  index?: number
}

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

export default function VacancyCard({ vacancy, index = 0 }: VacancyCardProps) {
  const { open: openCta } = useCta()
  const salaryParts = getSalaryParts(vacancy)

  const blurb = blockText(vacancy.description)
  const benefitText = blockText(vacancy.benefits)
  const benefits = benefitText
    .split(',')
    .map((b) => b.trim())
    .filter(Boolean)
    .slice(0, 3)

  const country = vacancy.country || 'International'
  const flag = COUNTRY_FLAGS[vacancy.country] || ''
  const detailsHref = vacancy.slug?.current ? `/vacancies/${vacancy.slug.current}` : null

  return (
    <Reveal
      y={24}
      delay={(index % 4) * 0.08}
      duration={0.55}
      className="h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white transition-all duration-500 hover:-translate-y-1.5">
        <div className="h-[3px] w-full bg-gradient-to-r from-secondary via-accent to-transparent" />

        <div className="relative h-52 overflow-hidden shrink-0">
          <img
            src={vacancy.thumbnailUrl || '/fallback.jpg'}
            alt={vacancy.title}
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.jpg' }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-transparent mix-blend-multiply" />

          <div className="absolute left-5 top-4">
            <span className="rounded-full bg-secondary text-primary text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1 shadow-md">
              {vacancy.type}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            {vacancy.department && (
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">{vacancy.department}</p>
            )}
            <h3 className="font-serif text-2xl font-bold leading-tight text-white">{vacancy.title}</h3>
          </div>
        </div>

        <div className="grid grid-cols-[7fr_3fr]">
          <div className="flex flex-col items-center justify-center gap-1 border-r border-white/20 bg-secondary px-4 py-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">Salary</span>
            <span className="flex flex-col items-center leading-tight">
              <span className="font-serif text-[1.4rem] font-bold text-primary sm:text-2xl">
                {salaryParts.main}
              </span>
              {salaryParts.suffix && (
                <span className="mt-0.5 text-[11px] font-semibold text-primary/70">
                  {salaryParts.suffix}
                </span>
              )}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 bg-[#0A1628] px-4 py-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">Country</span>
            <span className="font-serif text-[1.4rem] font-bold leading-tight text-white sm:text-2xl">
              {flag && <span className="mr-2">{flag}</span>}
              {country}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pb-4 text-sm text-muted-foreground">
            {vacancy.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent" />
                {vacancy.location}
              </span>
            )}
            {vacancy.deadline && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-accent" />
                Closes {new Date(vacancy.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </span>
            )}
          </div>

          {blurb && (
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-2">{blurb}</p>
          )}

          {benefits.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {benefits.map((b, i) => (
                <span key={i} className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[11px] font-medium text-primary">
                  {b}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-5">
            <Button
              variant="cta"
              onClick={() => openCta(vacancy.title)}
              size="sm"
              className="group/apply flex-1 gap-2 rounded-full font-medium uppercase tracking-wider"
            >
              Apply Now
              <ArrowRight size={14} className="transition-transform duration-300 group-hover/apply:translate-x-1" />
            </Button>
            {detailsHref && (
              <Link
                href={detailsHref}
                className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <span className="text-xs font-semibold uppercase tracking-wider">Details</span>
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}