import { useRef, useEffect, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  as?: 'div' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 30,
  x = 0,
  duration = 0.8,
  once = true,
  margin = '-80px',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, once]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : `translate(${x}px, ${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.16,1,0.3,1), transform ${duration}s cubic-bezier(0.16,1,0.3,1)`,
        transitionDelay: `${delay}s`,
        willChange: visible ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </Tag>
  );
}
