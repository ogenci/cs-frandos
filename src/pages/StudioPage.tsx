import {Studio} from 'sanity'
import config from '../../sanity.config'

export default function StudioPage() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Studio config={config} />
    </div>
  )
}