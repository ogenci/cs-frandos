import { createContext, useContext, useState, type ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ContactForm } from '@/components/ContactForm'

interface CtaContextValue {
  open: (defaultService?: string) => void
  close: () => void
}

const CtaContext = createContext<CtaContextValue | null>(null)

export function CtaModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultService, setDefaultService] = useState<string | undefined>()

  const open = (service?: string) => {
    setDefaultService(service)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setDefaultService(undefined)
  }

  return (
    <CtaContext.Provider value={{ open, close }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="left-0 right-0 mx-auto translate-x-0 w-[calc(100vw-3rem)] max-w-[615px] md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full top-0 md:top-[12vh] translate-y-0 max-h-[calc(100vh-2rem)] md:max-h-[100vh] overflow-y-auto my-4 md:my-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Get in Touch</DialogTitle>
            <DialogDescription className="text-base">
              Fill out the form below and we'll connect with you on WhatsApp within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <ContactForm defaultService={defaultService} onSuccess={close} />
        </DialogContent>
      </Dialog>
    </CtaContext.Provider>
  )
}

export function useCta() {
  const ctx = useContext(CtaContext)
  if (!ctx) throw new Error('useCta must be used within CtaModalProvider')
  return ctx
}
