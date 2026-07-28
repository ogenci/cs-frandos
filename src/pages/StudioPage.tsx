import {useState, type FormEvent} from 'react'
import {Studio} from 'sanity'
import config from '../../sanity.config'

export default function StudioPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('studio_auth') === 'true'
  )

  if (!authenticated) {
    return <PasswordGate onSuccess={() => {
      sessionStorage.setItem('studio_auth', 'true')
      setAuthenticated(true)
    }} />
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Studio config={config} />
    </div>
  )
}

function PasswordGate({onSuccess}: {onSuccess: () => void}) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value === import.meta.env.VITE_STUDIO_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-4 p-8 rounded-xl border border-border bg-card shadow-sm"
      >
        <h1 className="text-2xl font-serif text-primary mb-2">Studio Access</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter the studio password to continue.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          placeholder="Password"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-accent/40"
          autoFocus
        />
        {error && (
          <p className="text-destructive text-sm mb-4">Incorrect password.</p>
        )}
        <button
          type="submit"
          className="w-full rounded-full bg-accent text-white h-11 font-medium uppercase tracking-wider hover:bg-secondary hover:text-primary transition-all duration-300"
        >
          Enter Studio
        </button>
      </form>
    </div>
  )
}