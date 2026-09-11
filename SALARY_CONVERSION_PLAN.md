# AED → GHS Auto-Conversion - Build Plan

Status: active build reference. All decisions below are confirmed by the client.

## Goal
When a vacancy salary is entered in AED, the site automatically shows the converted GHS figure using the latest daily rate, floored to the nearest 100 on the low end. GHS-only display. Salary extras like "+ Overtime", "+ Trip Allowance", "(Commission-based…)" render smaller, on a sub-line under the main salary figure.

## Confirmed decisions
- Conversion runs client-side at render time via a shared formatter (`src/lib/salary.ts`).
- Rounding: floor to nearest 100 (`Math.floor(n / 100) * 100`) - 5,441.70 → 5,400. Applied only to AED-converted amounts; GHS amounts display exactly as entered.
- Rate: fetched every day at 12:00 UTC (noon Ghana) by a Vercel cron → `api/exchange-rate.ts` from `open.er-api.com` (free, no key), stored in a Sanity singleton (`_id: "exchangeRate"`, type `settings`), used for the next 24h. Hard fallback constant: `DEFAULT_AED_TO_GHS_RATE = 3.2`.
- Display: GHS only (never shows AED). Prefix ("From") stays inline; suffix renders as a small sub-line under the figure.

## Data flow
```
12:00 UTC daily
Vercel Cron ──► api/exchange-rate.ts ──► open.er-api.com/v6/latest/AED
                      │ writes
                      ▼
        Sanity singleton "settings" (_id: "exchangeRate", aedToGhsRate)
                      │ read via GROQ subquery in vacancy fetch
                      ▼
        getSalaryParts(vacancy) ──► VacancyCard / VacancyDetail
                      ▼
        "GH¢ 5,400"   (large) / "+ Trip Allowance" (small)
```

## Files to create / change

### 1. Sanity schema - `studio/schemaTypes/vacancy.ts`
Add structured salary fields (keep legacy `salary` string as fallback):
| Field | Type | Notes |
|---|---|---|
| `salaryCurrency` | string select | `AED` / `GHS`, default `GHS` |
| `salaryAmount` | number | validation: positive |
| `salaryPrefix` | string | inline, e.g. "From" |
| `salarySuffix` | string | sub-line, e.g. "+ Overtime" |
| `salary` (kept) | string | legacy fallback, hidden in Studio |

### 2. Rate document - `studio/schemaTypes/settings.ts` (new)
Singleton `settings`, `_id: "exchangeRate"`:
- `aedToGhsRate` (number)
- `updatedAt` (datetime)
- `rateSource` (string)
Register in `studio/structure.ts` as a single "Settings" document item.

### 3. Formatter - `src/lib/salary.ts` (new)
- `DEFAULT_AED_TO_GHS_RATE = 3.2`
- `floorToNearest100(n)` → `Math.floor(n / 100) * 100`
- `getSalaryParts(vacancy)` → `{ main: string, suffix: string | null }`
  - rate = `vacancy.rate` if valid number > 0 else `DEFAULT_AED_TO_GHS_RATE`
  - AED → `main = "GH¢ " + floorToNearest100(amount × rate)`
  - GHS → `main = "GH¢ " + amount` (as entered)
  - prefix prepended to `main` ("From GH¢ 3,190")
  - suffix returned separately → rendered small under main
  - no structured amount but legacy `salary` present → `main = salary string`, `suffix = null`
  - nothing → `"On Request"`

### 4. Queries - `src/lib/sanity.ts`
In `getVacancies()` and `getVacancyBySlug()` add to projection:
```
salaryCurrency, salaryAmount, salaryPrefix, salarySuffix,
"rate": *[_type == "settings"][0].aedToGhsRate
```

### 5. Rendering
- `VacancyCard.tsx` (salary box): bold serif `main` + small sub-line (`text-[11px] text-primary/70`) beneath; box stays `grid-cols-[7fr_3fr]`.
- `VacancyDetail.tsx` (facts card + sidebar compensation card): same treatment.

### 6. Daily job (Vercel)
- `api/exchange-rate.ts` (new): fetch `https://open.er-api.com/v6/latest/AED` → `rates.GHS`; validate number > 0; upsert Sanity `exchangeRate` doc using `SANITY_TOKEN` env; on failure keep prior stored value and return 500.
- `vercel.json`: add
  ```
  "crons": [{ "path": "/api/exchange-rate", "schedule": "0 12 * * *" }]
  ```
  and a rewrite rule so `/api/(.*)` bypasses the SPA catch-all (place BEFORE `/(.*)` → `/index.html`).

### 7. Migration - `scripts/migrate-salary.mjs`
One-off via `npx sanity exec` (studio token). Pads existing 17 vacancies by title. Order: amount/currency/prefix/suffix/legacy-string, then unset legacy `salary` on migrated docs.

Mapping table:
| Job | Amount | Currency | Prefix | Suffix |
|---|---|---|---|---|
| Landscaping Helper | 3600 | GHS | - | - |
| Mason / Steel Fixer / Carpenter | 4200 | GHS | - | - |
| Pastry Man / Baker | 4785 | GHS | From | - |
| Waiter / Kitchen Boy / Room Boy / Cleaner | 3190 | GHS | From | - |
| Laundry Man | 3509 | GHS | From | - |
| Dispatch Rider | 1700 | AED | - | + Trip Allowance |
| Taxi Driver | 6000 | GHS | - | (Commission-based structure also applies) |
| Sky Loader | 3200 | GHS | - | + Overtime |
| Aircraft Cleaner / Dnata Loader | 3500 | GHS | - | + Overtime |
| Etihad Loader | 4500 | GHS | - | + Overtime |
| Warehouse Worker | 5000 | GHS | - | + Overtime |
| Security Guard | 7800 | GHS | - | - |

### 8. Deployment (manual step)
- Create a Sanity read/write API token; add to Vercel project env as `SANITY_TOKEN`. Until present, site uses 3.2 fallback and cron reports failure.
- `npm run build` (vite + prerender + sitemap); deploy.

## Verification checklist
1. Migration: 17/17 patched, no legacy `salary` remnants.
2. Formatter: AED 1700 × 3.2010 = 5,441.70 → 5,400; × 3.2 = 5,440 → 5,400.
3. Card + detail: main figure with small suffix sub-line; "From" inline.
4. `npm run build` passes; prerender + sitemap intact.
5. `api/exchange-rate` returns 200 and writes/updates the doc; `updatedAt` advances.
6. Frontend falls back to 3.2 when doc missing.