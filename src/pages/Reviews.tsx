import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Star} from 'lucide-react'
import {Link} from 'wouter'
import Layout from '@/components/Layout'
import {Button} from '@/components/ui/button'
import {Reveal} from '@/components/Reveal'
import {VideoPlayer} from '@/components/VideoPlayer'
import {getTestimonials} from '@/lib/sanity'
import {useCta} from '@/components/CtaModal'
import SEO from '@/components/SEO'
import heroImg from '@assets/generated_images/service-travel.webp'

interface Testimonial {
  _id: string
  videoUrl: string | null
  thumbnailUrl: string | null
  featured: boolean
}

export default function Reviews() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const { open: openCta } = useCta()

  useEffect(() => {
    getTestimonials().then((data) => {
      setTestimonials(data)
      setLoading(false)
    })
  }, [])

  return (
    <Layout>
      <SEO
        title="Reviews"
        description="Watch video reviews from CS Franddos clients sharing their experience with our travel, visa, and recruitment services."
        path="/reviews"
      />
      <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Client reviews"
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
              <Star size={14} />
              Client Voices
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              All Reviews
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Watch what our clients have to say about their experience with CS Frandos.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal y={24} duration={0.6} once className="mb-14">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {loading ? 'Loading...' : `Genuine testimonials from real clients who trusted us with their journey.`}
            </p>
          </Reveal>

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">No testimonials yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {testimonials.filter((t) => t.videoUrl).map((t, i) => (
                <Reveal
                  key={t._id}
                  delay={(i % 4) * 0.08}
                  y={24}
                  duration={0.55}
                  className="rounded-[4px] overflow-hidden border border-border bg-black shadow-sm"
                >
                  <VideoPlayer src={t.videoUrl!} poster={t.thumbnailUrl ?? undefined} />
                </Reveal>
              ))}
            </div>
          )}
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
              See what CS Frandos can do for you - book a free consultation today.
            </p>
            <Button variant="ctaGold" onClick={() => openCta()} className="h-12 shadow-md hover:-translate-y-0.5">
                Get in Touch
            </Button>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}