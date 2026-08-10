export const DEFAULT_AED_TO_GHS_RATE = 3.2

export function floorToNearest100(n: number): number {
  return Math.floor(n / 100) * 100
}

function toLocale(n: number): string {
  return n.toLocaleString('en-US', {maximumFractionDigits: 0})
}

interface SalaryParts {
  main: string
  suffix: string | null
}

export function getSalaryParts(vacancy: any): SalaryParts {
  const amountRaw = Number(vacancy?.salaryAmount)
  const amount = Number.isFinite(amountRaw) && amountRaw > 0 ? amountRaw : null
  const currency = vacancy?.salaryCurrency || 'GHS'

  const prefix = typeof vacancy?.salaryPrefix === 'string' ? vacancy.salaryPrefix.trim() : ''
  const suffix = typeof vacancy?.salarySuffix === 'string' ? vacancy.salarySuffix.trim() : null

  if (amount === null) {
    const legacy = typeof vacancy?.salary === 'string' && vacancy.salary.trim()
    return legacy ? {main: legacy.trim(), suffix: null} : {main: 'On Request', suffix: null}
  }

  let figure: number
  if (currency === 'AED') {
    const rawRate = Number(vacancy?.rate)
    const rate = Number.isFinite(rawRate) && rawRate > 0 ? rawRate : DEFAULT_AED_TO_GHS_RATE
    figure = floorToNearest100(amount * rate)
  } else {
    figure = Math.round(amount)
  }

  const main = prefix ? `${prefix} GH¢ ${toLocale(figure)}` : `GH¢ ${toLocale(figure)}`
  return {main, suffix}
}

export function formatSalary(vacancy: any): string {
  const {main, suffix} = getSalaryParts(vacancy)
  return suffix ? `${main} ${suffix}` : main
}