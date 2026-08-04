import { SOCIALS } from '@/data/socials'

interface SocialLinksProps {
  itemClassName?: string
  iconSize?: number
}

export function SocialLinks({ itemClassName = 'w-10 h-10', iconSize = 18 }: SocialLinksProps) {
  return (
    <>
      {SOCIALS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={`rounded-full flex items-center justify-center transition-all ${itemClassName}`}
        >
          <social.Icon size={iconSize} />
        </a>
      ))}
    </>
  )
}
