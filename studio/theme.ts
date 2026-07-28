import {buildLegacyTheme} from 'sanity'

const props = {
  '--navy-blue': '#0a1628',
  '--warm-ivory': '#faf8f5',
  '--plum-purple': '#563a70',
  '--gold-bronze': '#c3a455',
  '--muted-gray': '#666d7a',
}

export const studioTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--navy-blue'],
  '--white': props['--warm-ivory'],

  '--gray': props['--muted-gray'],
  '--gray-base': props['--muted-gray'],

  /* Brand */
  '--brand-primary': props['--plum-purple'],

  /* Default button */
  '--default-button-color': props['--muted-gray'],
  '--default-button-primary-color': props['--plum-purple'],

  /* State */
  '--state-info-color': props['--plum-purple'],
  '--state-success-color': '#2e7d32',
  '--state-warning-color': '#f9a825',
  '--state-danger-color': '#d32f2f',

  /* Navbar */
  '--main-navigation-color': props['--navy-blue'],
  '--main-navigation-color--inverted': props['--warm-ivory'],

  /* Focus ring */
  '--focus-color': props['--gold-bronze'],
})
