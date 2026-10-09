import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, ChevronRight, Clock3, Menu, Pencil, Plus, Trash2, X } from 'lucide-react'
import { journalService } from './services/journalService'
import { MOODS, type JournalDraft, type JournalEntry, type Mood } from './types'

const toLocalIsoDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
const today = () => toLocalIsoDate(new Date())
const RECENT_DAYS_COUNT = 7
const recentDays = (): string[] => Array.from({ length: RECENT_DAYS_COUNT }, (_, offset) => {
  const day = new Date()
  day.setDate(day.getDate() - offset)
  return toLocalIsoDate(day)
}).reverse()
const prettyDate = (date: string, options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }) => new Intl.DateTimeFormat('en-US', options).format(new Date(`${date}T12:00:00`))
const moodFor = (mood: Mood) => MOODS.find((item) => item.value === mood) ?? MOODS[2]

function Layout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = location.pathname === '/'
  useEffect(() => {
    const pageTitle = location.pathname === '/'
      ? 'Home'
        : location.pathname === '/journals'
          ? 'My journals'
        : location.pathname === '/new'
          ? 'Add Journals'
          : location.pathname.startsWith('/edit/')
            ? 'Edit Journal'
            : 'Page Not Found'
    document.title = `${pageTitle} - Dailydots`
  }, [location.pathname])
  return <div className="min-h-screen">
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
      <Link to="/" className="flex items-center gap-2.5 text-ink" onClick={() => setMobileOpen(false)}>
        <img src="/assets/logo.webp" alt="daily dots" className="h-11 w-auto object-contain" />
      </Link>
      <button className="rounded-lg p-2 text-ink md:hidden" aria-label="Open navigation" onClick={() => setMobileOpen((open) => !open)}>
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={`${mobileOpen ? 'absolute left-5 right-5 top-[76px] z-10 flex' : 'hidden'} flex-col gap-1 rounded-2xl border border-sage bg-paper p-2 shadow-lg md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
        <NavLink to="/" onClick={() => setMobileOpen(false)} className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-sage text-ink' : 'text-muted hover:text-ink'}`}>Home</NavLink>
        <NavLink to="/journals" onClick={() => setMobileOpen(false)} className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-sage text-ink' : 'text-muted hover:text-ink'}`}>My journals</NavLink>
        <Link to="/new" onClick={() => setMobileOpen(false)} className="ml-0 inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-leaf md:ml-2"><Plus size={16} /> Add Journals</Link>
      </nav>
    </header>
    <main className={isHome ? '' : 'mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-10'}><Routes><Route path="/" element={<HomePage />} /><Route path="/journals" element={<JournalsPage />} /><Route path="/new" element={<JournalEditor />} /><Route path="/edit/:date" element={<JournalEditor />} /><Route path="*" element={<NotFound />} /></Routes></main>
    <footer className="mx-auto max-w-6xl px-5 py-8 text-xs text-muted sm:px-8 lg:px-10">A quiet place for the everyday things.</footer>
  </div>
}

function HomePage() {
  const entries = journalService.getAll()
  const latest = entries[0]
  const currentMood = latest ? moodFor(latest.mood) : null
  const streak = entries.length
  return <>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-20">
      <div className="animate-[fade-in_.6s_ease-out]">
        <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[.16em] text-leaf"><span className="size-2 rounded-full bg-terracotta" /> Your little corner of the day</p>
        <h1 className="max-w-xl font-display text-5xl leading-[.98] tracking-tight text-ink sm:text-7xl">Make a note of <span className="text-leaf">today.</span></h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted">A simple space to notice how you feel, remember what happened, and come back to yourself.</p>
        <Link to="/new" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-terracotta px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(215,131,98,.25)] transition hover:-translate-y-0.5 hover:bg-[#c86f50]"><Plus size={18} /> Write today</Link>
      </div>
      <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
        <div className="absolute -right-3 -top-5 size-20 rounded-full bg-sun/70 blur-[1px]" />
        <div className="relative rounded-[2rem] border border-white/70 bg-white/75 p-7 shadow-[0_20px_60px_rgba(77,101,86,.12)] backdrop-blur sm:p-9">
          <div className="mb-10 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[.18em] text-muted">{prettyDate(today(), { weekday: 'long', month: 'short', day: 'numeric' })}</span><CalendarDays className="text-leaf" size={20} /></div>
          {latest ? <><div className="mb-4 text-5xl">{currentMood?.emoji}</div><p className="text-xs font-bold uppercase tracking-[.15em] text-muted">Last note</p><h2 className="mt-2 font-display text-3xl text-ink">{prettyDate(latest.date, { month: 'long', day: 'numeric' })}</h2><p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">{latest.text}</p><Link to={`/edit/${latest.date}`} className="mt-7 inline-flex items-center gap-1 text-sm font-bold text-leaf hover:text-ink">Open your note <ArrowRight size={16} /></Link></> : <><div className="mb-4 text-5xl">🌱</div><h2 className="font-display text-3xl text-ink">Start small.</h2><p className="mt-3 text-sm leading-6 text-muted">Your first entry is the beginning of a lovely record of your days.</p></>}
        </div>
      </div>
    </section>
    <section className="border-y border-[#e6e3dc] bg-white/40"><div className="mx-auto grid max-w-6xl divide-y divide-[#e6e3dc] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10"><Stat label="Entries written" value={String(entries.length).padStart(2, '0')} icon={<BookOpen size={18} />} /><Stat label="Days captured" value={String(streak).padStart(2, '0')} icon={<Clock3 size={18} />} /><Stat label="Latest mood" value={currentMood?.emoji ?? '—'} icon={<span className="text-base">✦</span>} /></div></section>
  </>
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) { return <div className="flex items-center gap-4 px-2 py-5 sm:px-7 sm:py-7"><span className="grid size-9 place-items-center rounded-full bg-sage text-leaf">{icon}</span><div><p className="text-2xl font-semibold text-ink">{value}</p><p className="text-xs font-semibold uppercase tracking-[.12em] text-muted">{label}</p></div></div> }

function JournalsPage() {
  const [entries, setEntries] = useState(() => journalService.getAll())
  const navigate = useNavigate()
  const remove = (entry: JournalEntry) => { if (window.confirm(`Delete your entry from ${prettyDate(entry.date)}?`)) { journalService.delete(entry.id); setEntries(journalService.getAll()) } }
  return <div className="pt-10 sm:pt-16"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[.16em] text-leaf">Your archive</p><h1 className="font-display text-5xl tracking-tight text-ink">My journals</h1><p className="mt-3 text-muted">A record of the days you chose to keep.</p></div><Link to="/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-leaf"><Plus size={17} /> Add Journals</Link></div><div className="mt-10">{entries.length ? <div className="grid gap-3">{entries.map((entry) => <article key={entry.id} className="group flex flex-col gap-4 rounded-2xl border border-[#e4e5df] bg-white/75 p-5 shadow-sm transition hover:border-sage hover:shadow-md sm:flex-row sm:items-center sm:p-6"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sage text-2xl">{moodFor(entry.mood).emoji}</div><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-[.12em] text-leaf">{prettyDate(entry.date, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</p><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{entry.text}</p></div><div className="flex items-center gap-1 border-t border-[#ecebe6] pt-3 sm:border-0 sm:pt-0"><button onClick={() => navigate(`/edit/${entry.date}`)} aria-label={`Edit entry from ${prettyDate(entry.date)}`} className="rounded-lg p-2.5 text-muted hover:bg-sage hover:text-ink"><Pencil size={17} /></button><button onClick={() => remove(entry)} aria-label={`Delete entry from ${prettyDate(entry.date)}`} className="rounded-lg p-2.5 text-muted hover:bg-[#fae5dc] hover:text-terracotta"><Trash2 size={17} /></button><ChevronRight size={18} className="ml-1 text-[#b9c6bd]" /></div></article>)}</div> : <div className="rounded-3xl border border-dashed border-[#cbd8ce] bg-white/40 px-6 py-16 text-center"><div className="mx-auto grid size-14 place-items-center rounded-full bg-sage text-leaf"><BookOpen size={24} /></div><h2 className="mt-5 font-display text-2xl text-ink">No entries yet</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">Write down one small thing from today. It doesn’t need to be profound.</p><Link to="/new" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white hover:bg-leaf"><Plus size={16} /> Add first entry</Link></div>}</div></div>
}

type RecentDatePickerProps = { selectedDate: string; onSelect: (date: string) => void }

function RecentDatePicker({ selectedDate, onSelect }: RecentDatePickerProps) {
  const todayDate = today()
  return (
    <div role="group" aria-label="Pick a date from the past 7 days" className="mb-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
      {recentDays().map((date) => {
        const isSelected = date === selectedDate
        return (
          <button
            type="button"
            key={date}
            onClick={() => onSelect(date)}
            aria-pressed={isSelected}
            aria-label={prettyDate(date, { weekday: 'long', month: 'long', day: 'numeric' })}
            className={`flex flex-col items-center rounded-xl border px-2 py-2 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage/60 ${isSelected ? 'border-leaf bg-sage shadow-sm' : 'border-[#e0e3dd] bg-white hover:border-sage'}`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted">{date === todayDate ? 'Today' : prettyDate(date, { weekday: 'short' })}</span>
            <span className="text-lg font-bold text-ink">{prettyDate(date, { day: 'numeric' })}</span>
          </button>
        )
      })}
    </div>
  )
}

function JournalEditor() {
  const navigate = useNavigate(); const location = useLocation(); const editingDate = location.pathname.startsWith('/edit/') ? decodeURIComponent(location.pathname.replace('/edit/', '')) : undefined; const existing = editingDate ? journalService.getByDate(editingDate) : undefined
  const [draft, setDraft] = useState<JournalDraft>(() => existing ? { date: existing.date, mood: existing.mood, text: existing.text } : { date: today(), mood: 'steady', text: '' }); const [error, setError] = useState('')
  const dateTakenBy = journalService.getByDate(draft.date); const isUpdating = Boolean(existing || dateTakenBy)
  const update = <K extends keyof JournalDraft>(key: K, value: JournalDraft[K]) => setDraft((current) => ({ ...current, [key]: value }))
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!draft.text.trim()) { setError('Add a few words before saving.'); return } journalService.save({ ...draft, text: draft.text.trim() }); navigate('/journals') }
  return <div className="mx-auto max-w-2xl pt-10 sm:pt-16"><Link to={editingDate ? '/journals' : '/'} className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink"><ArrowLeft size={16} /> {editingDate ? 'Back to journals' : 'Back home'}</Link><div className="mt-10"><p className="mb-3 text-sm font-semibold uppercase tracking-[.16em] text-leaf">{editingDate ? 'Update your note' : 'A moment for you'}</p><h1 className="font-display text-5xl tracking-tight text-ink">{editingDate ? 'Keep the day close.' : 'How was today?'}</h1><p className="mt-3 text-muted">There’s no wrong way to write it down.</p></div><form onSubmit={submit} className="mt-10 space-y-8"><div><label htmlFor="entry-date" className="mb-2 block text-sm font-bold text-ink">Date</label><RecentDatePicker selectedDate={draft.date} onSelect={(date) => update('date', date)} /><input id="entry-date" type="date" value={draft.date} onChange={(event) => update('date', event.target.value)} className="w-full rounded-xl border border-[#d8ddd7] bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-4 focus:ring-sage/60" /></div><fieldset><legend className="mb-3 text-sm font-bold text-ink">How are you feeling?</legend><div className="grid grid-cols-5 gap-2">{MOODS.map((mood) => <button type="button" key={mood.value} onClick={() => update('mood', mood.value)} aria-pressed={draft.mood === mood.value} className={`flex min-h-20 flex-col items-center justify-center gap-1 rounded-xl border text-2xl transition ${draft.mood === mood.value ? 'border-leaf bg-sage shadow-sm' : 'border-[#e0e3dd] bg-white hover:border-sage'}`}><span>{mood.emoji}</span><span className="text-[10px] font-bold uppercase tracking-wide text-muted">{mood.label}</span></button>)}</div></fieldset><div><div className="mb-2 flex items-baseline justify-between gap-4"><label htmlFor="entry-text" className="text-sm font-bold text-ink">Your journal</label><p id="entry-text-count" className="text-sm text-muted">{draft.text.length} {draft.text.length === 1 ? 'character' : 'characters'}</p></div><textarea id="entry-text" rows={9} value={draft.text} onChange={(event) => { update('text', event.target.value); setError('') }} aria-describedby="entry-text-count" placeholder="What’s on your mind?" className="w-full resize-y rounded-xl border border-[#d8ddd7] bg-white px-4 py-4 leading-7 text-ink outline-none transition placeholder:text-[#aab3ad] focus:border-leaf focus:ring-4 focus:ring-sage/60" />{error && <p className="mt-2 text-sm font-semibold text-terracotta">{error}</p>}</div>{dateTakenBy && !existing && <p className="-mt-3 flex items-start gap-2 rounded-xl bg-[#fff4db] p-3 text-sm leading-6 text-[#80652e]"><Check size={17} className="mt-1 shrink-0" /> You already have an entry for this date. Saving will update it.</p>}<div className="flex flex-col-reverse gap-3 border-t border-[#e4e5df] pt-6 sm:flex-row sm:justify-end"><Link to={editingDate ? '/journals' : '/'} className="rounded-xl px-5 py-3 text-center text-sm font-bold text-muted hover:bg-white hover:text-ink">Cancel</Link><button type="submit" className="rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-leaf">{isUpdating ? 'Update entry' : 'Save entry'}</button></div></form></div>
}

function NotFound() { return <div className="py-24 text-center"><h1 className="font-display text-4xl text-ink">This page wandered off.</h1><Link to="/" className="mt-5 inline-flex items-center gap-2 font-bold text-leaf">Go home <ArrowRight size={16} /></Link></div> }

export default function App() { return <Layout /> }
