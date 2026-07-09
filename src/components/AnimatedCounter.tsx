import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  className = "",
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return
    
    let startTime: number | null = null
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const progressRatio = Math.min(progress / (duration * 1000), 1)
      
      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progressRatio, 4)
      
      setCount(Math.floor(easeProgress * (to - from) + from))
      
      if (progressRatio < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(to)
      }
    }
    
    requestAnimationFrame(updateCount)
  }, [from, to, duration, isInView])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
