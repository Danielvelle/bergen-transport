# MIGRATION_TO_WINDOWS — bergen-transport

**Prioritet: sekundær.**
Next.js-prosjekt, commit 7 dager siden. Ingen aktive prosesser på denne maskinen, ingen lokal DB, ingen `.env`-fil. Trygg å migrere.

## Stack

- **Next.js** (next.config.ts)
- TypeScript
- Tailwind (postcss.config.mjs)
- Statisk eksport-mulighet (`out/` finnes, tyder på `next build && next export`)
- Kjøres: `npm run dev` → http://localhost:3000

## Live-prosesser

Ingen kjørende prosess funnet.

## Kritiske filer og mapper

### MÅ kopieres

- `src/` — all kildekode
- `public/` — statiske assets
- `package.json`, `package-lock.json`
- `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `components.json`
- `CLAUDE.md`, `AGENTS.md`, `README.md`

### IKKE kopier

- `node_modules/` — regenereres med `npm install`
- `.next/` — build-cache (inneholder `.next/package.json` som ikke er din; Next genererer den)
- `out/` — static export output, regenereres ved `npm run build`

### Ikke funnet (forventet men mangler)

- **Ingen `.env`-fil funnet.** Hvis prosjektet har secrets (API-nøkler, analytics-ID-er), ligger de sannsynligvis inline eller i Vercel-env. Verifiser om du mangler noe ved første `npm run dev` på Windows.

## Installer på Windows

1. **Node.js 20+**
2. **Git**

## Start på Windows

```powershell
cd C:\Users\<brukernavn>\bergen-transport
npm install
npm run dev
```

## Mac-spesifikke problemer

Ingen åpenbare. Rent Next-prosjekt uten shell-scripts.

## Forventede problemer

1. Muligens hardcodede paths i `CLAUDE.md`/`AGENTS.md` — ikke kode-kritisk, kun AI-instruks.
2. Hvis noen API-endepunkter trenger env-variabler som ligger i Vercel (ikke lokalt), vil dev-server feile ved første kall. Legg til en lokal `.env.local` hvis nødvendig.

## Sjekkliste før levering av Mac

- [ ] Hele `projects/bergen-transport/` pakket (unntatt `node_modules`, `.next`, `out`)
- [ ] Sjekket om Vercel har private env-variabler som ikke finnes lokalt
