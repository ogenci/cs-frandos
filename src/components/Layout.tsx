import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/SocialLinks';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = ['Home', 'Services', 'Destinations', 'About', 'Vacancies', 'Insights', 'Contact'];

export default function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navHref = (item: string) => {
    if (item === 'Home') return '/';
    if (item === 'Services') return '/services';
    if (item === 'Destinations') return '/destinations';
    if (item === 'About') return '/about';
    if (item === 'Vacancies') return '/vacancies';
    if (item === 'Insights') return '/insights';
    if (item === 'Contact') return '/contact';
    return `/#${item.toLowerCase()}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[999] mix-blend-difference" aria-hidden="true">
        <div className="absolute inset-y-0 left-[calc(7.5vw-12px)] w-px bg-accent opacity-20" />
        <div className="absolute inset-y-0 right-[calc(7.5vw-12px)] w-px bg-accent opacity-20" />
      </div>

            {/* TOP INFO BAR */}
      <div 
        className="fixed top-0 z-[60] bg-accent text-white/80 text-[11px] font-medium h-9 rounded-b-[4px]"
        style={{ left: 'calc(7.5vw)', right: 'calc(7.5vw)' }}
      >
        <div className="w-full h-full px-5 flex items-center justify-between gap-4">

          {/* Left - registration numbers */}
          <div className="hidden sm:flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="text-secondary font-semibold tracking-wide uppercase text-[9px]">Reg. No.</span>
              <span className="text-white/70">GH-REG-000000</span>
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <span className="text-secondary font-semibold tracking-wide uppercase text-[9px]">Recruit. Lic.</span>
              <span className="text-white/70">GHA-LIC-000000</span>
            </span>
          </div>

          {/* Right - phone numbers */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="tel:+233247789031"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              <Phone size={11} className="text-secondary shrink-0" />
              <span>024 778 9031</span>
            </a>
            <span className="w-px h-3 bg-white/20" />
            <a
              href="tel:+233247789031"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              <Phone size={11} className="text-secondary shrink-0" />
              <span>024 203 5562</span>
            </a>
          </div>

          {/* Socials */}
          <div className="hidden md:flex items-center gap-1.5 border-l border-white/20 pl-4">
            <SocialLinks itemClassName="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 hover:text-white transition-colors" iconSize={11} />
          </div>

        </div>
      </div>

<header className="fixed top-11 left-0 right-0 z-50 flex justify-center border-b border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className={`w-full rounded-[4px] border backdrop-blur-md px-5 py-2.5 flex items-center justify-between gap-4 transition-all duration-500 ${
            isScrolled
              ? 'bg-white/20 shadow-lg border-white/20'
              : 'bg-white/5 border-white/10'
          }`}>
          <Link href="/" className="flex items-center shrink-0 gap-2.5">
            <img src="/logo.webp" alt="CS Franddos" loading="lazy" className="h-8 w-auto" />
            <span className={`text-base font-bold tracking-wider uppercase transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              CS <span className="text-secondary">Franddos</span>
            </span>
          </Link>

          <nav aria-label="Primary" className={`hidden lg:flex items-center justify-center gap-1 rounded-full py-2 px-4 backdrop-blur-md border transition-all duration-500 ${
            isScrolled
              ? 'bg-white/30 border-primary/10'
              : 'bg-white/10 border-white/15'
          }`}>
            {navItems.map((item) => (
              <Link
                key={item}
                href={navHref(item)}
                className={`group flex items-center text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-white px-3 py-2 rounded-full hover:bg-accent ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}
              >
                <span className="block overflow-hidden h-[14px] leading-[14px]">
                  <span className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-[14px]">
                    <span className="block h-[14px]">{item}</span>
                    <span className="block h-[14px]">{item}</span>
                  </span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
                <Link href="/contact">
              <Button
                size="sm"
                className={`group hidden lg:flex rounded-full px-5 h-8 font-medium uppercase tracking-wider items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  isScrolled
                    ? 'bg-accent text-white hover:bg-secondary hover:text-primary'
                    : 'bg-accent text-white hover:bg-secondary hover:text-primary'
                }`}
              >
                <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started</span>
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started</span>
                </span>
              </Button>
            </Link>

            <button
              className={`lg:hidden p-1.5 rounded-lg transition-colors ${isScrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'}`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[300px] sm:w-[340px] bg-white z-[70] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-7 py-6 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <img src="/logo.webp" alt="CS Franddos" loading="lazy" className="h-8 w-auto" />
                  <span className="text-lg font-bold tracking-tight text-primary">
                    CS <span className="text-secondary">Franddos</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors btn-flip-icon"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex flex-col px-7 pt-6 pb-4 flex-1 overflow-y-auto">
                {navItems.map((item, i) => (
                  <Link
                    key={item}
                    href={navHref(item)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-4 border-b border-border/40 last:border-0"
                  >
                    <span className="text-xl font-serif text-primary group-hover:text-accent transition-colors">{item}</span>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="px-7 py-7 border-t border-border/60 space-y-3"
              >
            <Link href="/contact">
                  <Button size="lg" className="group w-full rounded-full bg-accent text-white font-medium uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:bg-secondary hover:text-primary hover:-translate-y-0.5 shadow-md">
                    <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Today</span>
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Get Started Today</span>
                    </span>
                  </Button>
                </Link>
                <p className="text-center text-sm text-muted-foreground pt-1">
                  Call us: <a href="tel:+233247789031" className="text-accent font-medium hover:underline">024 778 9031</a>
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main id="main-content">{children}</main>

      <Footer />
    </div>
  );
}
