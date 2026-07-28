import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { CtaModalProvider } from '@/components/CtaModal';
import Home from '@/pages/Home';

const Services = lazy(() => import('@/pages/Services'));
const Destinations = lazy(() => import('@/pages/Destinations'));
const About = lazy(() => import('@/pages/About'));
const Insights = lazy(() => import('@/pages/Insights'));
const Contact = lazy(() => import('@/pages/Contact'));
const Reviews = lazy(() => import('@/pages/Reviews'));
const Post = lazy(() => import('@/pages/Post'));
const Destination = lazy(() => import('@/pages/Destination'));
const NotFound = lazy(() => import('@/pages/not-found'));
const StudioPage = lazy(() => import('@/pages/StudioPage'));
const Vacancies = lazy(() => import('@/pages/Vacancies'));

function ScrollToTop() {
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/about" component={About} />
          <Route path="/insights" component={Insights} />
          <Route path="/contact" component={Contact} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/vacancies" component={Vacancies} />
          <Route path="/insights/:slug" component={Post} />
          <Route path="/destination/:slug" component={Destination} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  if (window.location.pathname.startsWith('/studio')) {
    return (
      <Suspense fallback={null}>
        <StudioPage />
      </Suspense>
    );
  }

  return (
    <HelmetProvider>
      <TooltipProvider>
        <CtaModalProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </CtaModalProvider>
      </TooltipProvider>
    </HelmetProvider>
  );
}

export default App;