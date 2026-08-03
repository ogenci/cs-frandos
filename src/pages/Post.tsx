import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Link, useParams} from 'wouter'
import {ArrowRight, Calendar, Clock, ChevronLeft, User, Tag} from 'lucide-react'
import {PortableText, type TypedObject} from '@portabletext/react'
import Layout from '@/components/Layout'
import {Button} from '@/components/ui/button'
import {Reveal} from '@/components/Reveal'
import {useCta} from '@/components/CtaModal'
import SEO from '@/components/SEO'
import {articleSchema, breadcrumbSchema} from '@/lib/structuredData'
import {getPostBySlug, getPosts} from '@/lib/sanity'

interface PostData {
  _id: string
  title: string
  slug: {current: string}
  tag: string | null
  summary: string | null
  content: TypedObject[] | null
  date: string | null
  readTime: number | null
  author: string | null
  imageUrl: string | null
}

export default function Post() {
  const params = useParams()
  const { open: openCta } = useCta()
  const [post, setPost] = useState<PostData | null>(null)
  const [allPosts, setAllPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params?.slug) return
    setLoading(true)
    getPostBySlug(params.slug).then((data) => {
      setPost(data)
      setLoading(false)
    })
    getPosts().then(setAllPosts)
  }, [params?.slug])

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function truncateText(text: string | null | undefined, maxChars: number = 110) {
    if (!text) return ''
    if (text.length <= maxChars) return text
    return text.slice(0, maxChars).trim() + '...'
  }

  if (loading) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Loading...</p>
        </section>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-primary mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/insights">
              <Button variant="cta" className="px-6">
                Back to Insights
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    )
  }

  // Same-category articles (excluding current)
  const sameCategory = allPosts
    .filter((p) => p._id !== post._id && p.tag === post.tag)
    .slice(0, 4)

  // Latest articles (excluding current, fallback if same-category is empty)
  const latestSidebar = allPosts
    .filter((p) => p._id !== post._id)
    .slice(0, 4)

  const sidebarArticles = sameCategory.length > 0 ? sameCategory : latestSidebar

  // Latest articles for the bottom section (up to 3, excluding current)
  const latestBottom = allPosts.filter((p) => p._id !== post._id).slice(0, 3)

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.summary || `Read about ${post.title} on CS Franddos Insights`}
        path={`/insights/${post.slug.current}`}
        image={post.imageUrl || undefined}
        type="article"
        publishedTime={post.date || undefined}
        jsonLd={[
          articleSchema(
            post.title,
            post.summary || '',
            `https://csfranddos.com/insights/${post.slug.current}`,
            post.imageUrl || '',
            post.date || '',
            post.author || 'CS Franddos'
          ),
          breadcrumbSchema([
            {name: 'Home', url: 'https://csfranddos.com'},
            {name: 'Insights', url: 'https://csfranddos.com/insights'},
            {name: post.title, url: `https://csfranddos.com/insights/${post.slug.current}`},
          ]),
        ]}
      />
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={post.imageUrl || ''}
          alt={post.title}
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
              href="/insights"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-secondary text-sm font-medium tracking-wide transition-colors mb-4"
            >
              <ChevronLeft size={14} />
              Back to Insights
            </Link>
            {post.tag && (
              <div className="mb-3">
                <span className="bg-secondary/20 text-secondary border border-secondary/30 rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                  {post.tag}
                </span>
              </div>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-4 max-w-4xl leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              {post.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.date)}
                </span>
              )}
              {post.date && post.readTime && <span className="w-1 h-1 rounded-full bg-white/30" />}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readTime} min read
                </span>
              )}
              {post.author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    {post.author}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content + Sidebar */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 xl:gap-12">

            {/* ── LEFT: Article body ── */}
            <div className="lg:border-r lg:border-border/60 lg:pr-8 xl:pr-12">
              <Reveal y={24} duration={0.7} once className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-strong:text-primary">
                {post.summary && (
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-serif italic border-l-4 border-secondary/40 pl-5">
                    {post.summary}
                  </p>
                )}
                {post.content && (
                  <div className="border-t border-border/40 pt-8">
                    <PortableText value={post.content} />
                  </div>
                )}
              </Reveal>

              {/* Share bar */}
              <Reveal y={20} duration={0.6} once className="mt-14 pt-8 border-t border-border/40">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tracking-widest uppercase text-accent">Share</span>
                    <div className="flex gap-2">
                      {[{name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://csfranddos.com/insights/${post.slug.current}`)}`}, {name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://csfranddos.com/insights/${post.slug.current}`)}`}, {name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://csfranddos.com/insights/${post.slug.current}`)}`}].map((s) => (
                        <a
                          key={s.name}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-muted hover:bg-accent hover:text-white flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all"
                        >
                          {s.name}
                        </a>
                    ))}
                    </div>
                  </div>
                  <Link href="/insights">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all cursor-pointer">
                      <ArrowRight size={14} className="rotate-180" />
                      Back to Insights
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div>
              <aside className="space-y-8 lg:sticky lg:top-28">

                {/* Author card */}
                {post.author && (
                  <Reveal y={20} duration={0.6} once>
                    <div className="bg-white border border-border/60 rounded-[4px] p-6 shadow-sm">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-4">Author</p>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-primary text-sm">{post.author}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">CS Frandos Contributor</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Category / same-tag articles */}
                {sidebarArticles.length > 0 && (
                  <Reveal y={20} duration={0.6} once delay={0.05}>
                    <div className="bg-white border border-border/60 rounded-[4px] p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-5">
                        <Tag size={13} className="text-accent" />
                        <p className="text-[10px] font-bold tracking-widest uppercase text-accent">
                          {sameCategory.length > 0 ? `More in ${post.tag}` : 'You Might Also Like'}
                        </p>
                      </div>
                      <ul className="space-y-4">
                        {sidebarArticles.map((p) => (
                          <li key={p._id}>
                            <Link href={`/insights/${p.slug.current}`} className="group block">
                              <div className="flex gap-3 items-start">
                                {p.imageUrl && (
                                  <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    loading="lazy"
                                    className="w-14 h-14 rounded-[4px] object-cover shrink-0 group-hover:opacity-90 transition-opacity"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                                    {p.title}
                                  </p>
                                  {p.date && (
                                    <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                                      <Calendar size={10} />
                                      {formatDate(p.date)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}

                {/* CTA card */}
                <Reveal y={20} duration={0.6} once delay={0.1}>
                  <div className="bg-primary rounded-[4px] p-6 text-white">
                    <p className="font-serif text-xl font-bold mb-2 leading-snug">Ready to Start Your Journey?</p>
                    <p className="text-white/60 text-sm leading-relaxed mb-5">
                      Book a free consultation with our team today.
                    </p>
                    <Button variant="ctaGold" onClick={() => openCta()} className="w-full h-10 text-xs">
                        Start Your Journey
                      </Button>
                  </div>
                </Reveal>

              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles — above footer */}
      {latestBottom.length > 0 && (
        <section className="py-20 md:py-28 bg-white border-t border-border/40">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <Reveal y={24} duration={0.6} once className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-2">Keep Reading</p>
                <h2 className="text-3xl md:text-4xl font-serif text-primary">Latest Articles</h2>
              </div>
              <Link href="/insights" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all">
                View all <ArrowRight size={14} />
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestBottom.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.08} y={24} duration={0.55}>
                  <div className="flex flex-col border border-border/60 bg-background rounded-[4px] overflow-hidden h-full shadow-sm">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={p.imageUrl || ''}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {p.tag && (
                        <span className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase text-white bg-primary/60 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-3 text-muted-foreground text-[11px] mb-2">
                        {p.date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {formatDate(p.date)}
                          </span>
                        )}
                        {p.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {p.readTime} min
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-serif font-bold text-primary leading-snug line-clamp-2 flex-1">
                        {p.title}
                      </h3>
                      {p.summary && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                          {truncateText(p.summary, 110)}
                        </p>
                      )}
                      <div className="mt-4 pt-3 border-t border-border/40">
                        <Link href={`/insights/${p.slug.current}`}>
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

            <div className="mt-8 sm:hidden text-center">
              <Link href="/insights">
                <Button variant="ctaOutline" className="px-6">
                  View all articles <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}