import {createClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {homedir} from 'os'
import {join} from 'path'

const cfg = JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'))
const client = createClient({
  projectId: '9ruf4c2t',
  dataset: 'cs-franddos',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: cfg.authToken,
})

const mapping = [
  {title: 'Landscaping Helper', amount: 3600, currency: 'GHS'},
  {title: 'Mason', amount: 4200, currency: 'GHS'},
  {title: 'Steel Fixer', amount: 4200, currency: 'GHS'},
  {title: 'Carpenter', amount: 4200, currency: 'GHS'},
  {title: 'Pastry Man / Baker', amount: 4785, currency: 'GHS', prefix: 'From'},
  {title: 'Waiter', amount: 3190, currency: 'GHS', prefix: 'From'},
  {title: 'Kitchen Boy', amount: 3190, currency: 'GHS', prefix: 'From'},
  {title: 'Room Boy / Cleaner', amount: 3190, currency: 'GHS', prefix: 'From'},
  {title: 'Laundry Man', amount: 3509, currency: 'GHS', prefix: 'From'},
  {title: 'Dispatch Rider', amount: 1700, currency: 'AED', suffix: '+ Trip Allowance'},
  {title: 'Taxi Driver', amount: 6000, currency: 'GHS', suffix: '(Commission-based structure also applies)'},
  {title: 'Sky Loader', amount: 3200, currency: 'GHS', suffix: '+ Overtime'},
  {title: 'Aircraft Cleaner', amount: 3500, currency: 'GHS', suffix: '+ Overtime'},
  {title: 'Dnata Loader', amount: 3500, currency: 'GHS', suffix: '+ Overtime'},
  {title: 'Etihad Loader', amount: 4500, currency: 'GHS', suffix: '+ Overtime'},
  {title: 'Warehouse Worker', amount: 5000, currency: 'GHS', suffix: '+ Overtime'},
  {title: 'Security Guard', amount: 7800, currency: 'GHS'},
]

const existing = await client.fetch(`*[_type == "vacancy"]{_id, title}`)
const byTitle = new Map(existing.map((d) => [d.title, d]))

let ok = 0
let missing = []

for (const m of mapping) {
  const doc = byTitle.get(m.title)
  if (!doc) {
    missing.push(m.title)
    continue
  }
  const patch = client.patch(doc._id).set({
    salaryCurrency: m.currency,
    salaryAmount: m.amount,
    salaryPrefix: m.prefix || '',
    salarySuffix: m.suffix || '',
  })
  await patch.unset(['salary']).commit()
  ok++
  console.log(`MIGRATED ${m.title} -> ${m.currency} ${m.amount}${m.prefix ? ' [' + m.prefix + ']' : ''}${m.suffix ? ' / ' + m.suffix : ''}`)
}

console.log(`\nMigrated ${ok}/${mapping.length}`)
if (missing.length) console.log('NOT FOUND:', missing.join(', '))