import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Link} from 'wouter'
import {Globe, ArrowRight, Calendar, Clock, Star} from 'lucide-react'
import Layout from '@/components/Layout'
import {Button} from '@/components/ui/button'
import {Reveal} from '@/components/Reveal'
import SEO from '@/components/SEO'
import {useCta} from '@/components/CtaModal'
import {getPosts} from '@/lib/sanity'

interface Post {
  _id: string
  title: string
  slug: {current: string}
  tag: string | null
  summary: string | null
  date: string | null
  readTime: number | null
  author: string | null
  imageUrl: string | null
}

export default function Insights() {
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { open: openCta } = useCta()

  useEffect(() => {
    getPosts().then((data) => {
      setAllPosts(data)
      setLoading(false)
    })
  }, [])

  const featured = allPosts[0]
  const remaining = allPosts.slice(1)

  if (loading) {
    return (
      <Layout>
        <section className="h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading insights...</p>
        </section>
      </Layout>
    )
  }

  if (!allPosts.length) {
    return (
      <Layout>
        <section className="h-screen flex items-center justify-center">
          <p className="text-muted-foreground">No posts yet.</p>
        </section>
      </Layout>
    )
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function truncateText(text: string | null | undefined, maxChars: number = 130) {
    if (!text) return ''
    if (text.length <= maxChars) return text
    return text.slice(0, maxChars).trim() + '...'
  }

  return (
    <Layout>
      <SEO
        title="Insights"
        description="Expert advice on visas, travel, and global career opportunities from CS Franddos."
        path="/insights"
      />
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={featured.imageUrl || ''}
          alt="Insights"
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
              <Globe size={14} />
              Resources
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3">
              Insights
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Expert advice on visas, travel, and global career opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">

          <Reveal y={30} duration={0.8}>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-border/60 rounded-[4px] overflow-hidden shadow-sm">

              {/* Image — left, full height */}
              <div className="relative h-[280px] sm:h-[360px] lg:h-auto min-h-[400px] overflow-hidden">
                <img
                  src={featured.imageUrl || ''}
                  alt={featured.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
                {/* Badges */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-white bg-secondary rounded-full px-3 py-1.5 shadow">
                    <Star size={9} className="fill-white" />
                    Featured
                  </span>
                  {featured.tag && (
                    <span className="text-[9px] font-bold tracking-widest uppercase text-white bg-white/20 backdrop-blur-sm border border-white/25 rounded-full px-2.5 py-1.5">
                      {featured.tag}
                    </span>
                  )}
                </div>
              </div>

              {/* Content — right */}
              <div className="flex flex-col justify-between p-8 md:p-10 lg:p-14">
                <div>
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-muted-foreground text-xs mb-5">
                    {featured.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatDate(featured.date)}
                      </span>
                    )}
                    {featured.readTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {featured.readTime} min read
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-primary mb-5 leading-snug">
                    {featured.title}
                  </h3>

                  {/* Summary — truncated to max 180 characters */}
                  {featured.summary && (
                    <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-8">
                      {truncateText(featured.summary, 180)}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div>
                  <Link href={`/insights/${featured.slug.current}`}>
                    <Button variant="ctaOutline" className="px-6">
                      <span className="flex items-center gap-2">
                        Read Full Article
                        <ArrowRight size={14} />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>


      {/* All Articles */}
      <section className="pb-24 md:pb-32 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal y={30} duration={0.8} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
              All Articles
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((post, i) => (
              <Reveal
                key={post._id}
                delay={i * 0.08}
                y={24}
                duration={0.55}
                className="flex flex-col border border-border/60 bg-background rounded-[4px] overflow-hidden h-full shadow-sm"
              >
                <div className="flex flex-col flex-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl || ''}
                      alt={post.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {post.tag && (
                      <span className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase text-white bg-primary/60 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1">
                        {post.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-3 text-muted-foreground text-[11px] mb-2">
                      {post.date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(post.date)}
                        </span>
                      )}
                      {post.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {post.readTime} min
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-serif font-bold text-primary leading-snug line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                        {truncateText(post.summary, 110)}
                      </p>
                    )}
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <Link href={`/insights/${post.slug.current}`}>
                        <Button size="sm" variant="ctaOutline" className="text-xs">
                          Read Article <ArrowRight size={12} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
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
              Stay Updated
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 text-lg">
              Follow our insights for the latest on visas, travel, and global career opportunities.
            </p>
            <Button variant="ctaGold" onClick={() => openCta()} className="h-12 shadow-md hover:-translate-y-0.5">
                Start Your Journey
            </Button>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}