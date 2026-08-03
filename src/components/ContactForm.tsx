import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface ContactFormProps {
  defaultService?: string
  onSuccess?: () => void
}

const SERVICE_LABELS: Record<string, string> = {
  visa: 'Visa Application',
  jobs: 'International Recruitment / Jobs',
  travel: 'Travel & Tour Packages',
  passport: 'Passport & Document Assistance',
  other: 'Other Inquiry',
}

export function ContactForm({ defaultService, onSuccess }: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService ?? '',
    message: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const serviceLabel = formData.service ? SERVICE_LABELS[formData.service] ?? formData.service : 'Not specified'

    const whatsappText = encodeURIComponent(
      `*New Inquiry from CS Franddos Limited Website*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Service:* ${serviceLabel}\n` +
      `*Message:* ${formData.message}`
    )

    window.open(`https://wa.me/233247789031?text=${whatsappText}`, '_blank')

    toast({
      title: 'Redirecting to WhatsApp',
      description: 'Complete your message on WhatsApp and our team will respond shortly.',
    })

    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    setIsSubmitting(false)
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Full Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="h-12 bg-background border-border/60 focus-visible:ring-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Email *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="h-12 bg-background border-border/60 focus-visible:ring-accent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Phone Number *</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+233 24 000 0000"
            className="h-12 bg-background border-border/60 focus-visible:ring-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Service of Interest</label>
          <Select
            value={formData.service}
            onValueChange={(val) => setFormData({ ...formData, service: val })}
          >
            <SelectTrigger className="h-12 bg-background border-border/60 focus:ring-accent">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visa">Visa Application</SelectItem>
              <SelectItem value="jobs">International Recruitment / Jobs</SelectItem>
              <SelectItem value="travel">Travel & Tour Packages</SelectItem>
              <SelectItem value="passport">Passport & Document Assistance</SelectItem>
              <SelectItem value="other">Other Inquiry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">Message *</label>
        <Textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your goals or requirements..."
          className="min-h-[140px] resize-none bg-background border-border/60 focus-visible:ring-accent"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="cta"
        className="group w-full h-12 shadow-md hover:-translate-y-0.5 gap-2"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="overflow-hidden h-[1em] leading-[1em] flex flex-col">
            <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Send via WhatsApp</span>
            <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">Send via WhatsApp</span>
          </span>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Your information is secure and will never be shared with third parties.
      </p>
    </form>
  )
}
