import { Facebook, Instagram, type LucideIcon } from 'lucide-react'
import { TikTokIcon } from '@/components/icons/TikTokIcon'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

export interface Social {
  label: string
  href: string
  Icon: LucideIcon | typeof TikTokIcon | typeof WhatsAppIcon
}

export const SOCIALS: Social[] = [
  { label: 'Facebook', href: 'https://web.facebook.com/csfranddosldt/', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/csfranddosltd/', Icon: Instagram },
  { label: 'TikTok', href: '#', Icon: TikTokIcon },
  { label: 'WhatsApp', href: 'https://wa.me/233247789031', Icon: WhatsAppIcon },
]
