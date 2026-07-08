import { useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabaseClient'
import { useAuth } from './hooks/useAuth'
import { useFlashcards } from './hooks/useFlashcards'
import { AuthScreen } from './components/AuthScreen'
import { ImportPanel } from './components/ImportPanel'
import { FlashcardView } from './components/FlashcardView'
import { ProgressBar } from './components/ProgressBar'
import type { CardStatus, StudyFilter } from './types'

function passesFilter(status: CardStatus, filter: StudyFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'review') return status === 'review'
  return status !== 'learned' // 'due'
}

const FILTERS: { key: StudyFilter; label: string }[] = [
  { key: 'due', label: 'Due to study' },
  { key: 'review', label: 'Marked review' },
  { key: 'all', label: 'All cards' },
]

function StudyApp({ userId, userEmail }: { userId: string; userEmail: string }) {
  const { cards, loading, error, addCards, updateStatus } = useFlashcards(userId)
  const [filter, setFilter] = useState<StudyFilter>('due')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [importOpen, setImportOpen] = useState(false)

  const queue = useMemo(() => cards.filter((c) => passesFilter(c.status, filter)), [cards, filter])
  const masteredCount = useMemo(() => cards.filter((c) => c.status === 'learned').length, [cards])

  useEffect(() => {
    setIndex(0)
    setFlipped(false)
  }, [filter])

  useEffect(() => {
    if (index >= queue.length && queue.length > 0) setIndex(0)
  }, [queue.length, index])

  const currentCard = queue[index]

  function goNext() {
    setFlipped(false)
    setIndex((i) => (queue.length > 0 ? (i + 1) % queue.length : 0))
  }

  function goPrev() {
    setFlipped(false)
    setIndex((i) => (queue.length > 0 ? (i - 1 + queue.length) % queue.length : 0))
  }

  function markStatus(next: CardStatus) {
    if (!currentCard) return
    const staysInQueue = passesFilter(next, filter)
    updateStatus(currentCard.id, next)
    setFlipped(false)
    if (staysInQueue) {
      setIndex((i) => (queue.length > 0 ? (i + 1) % queue.length : i))
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-title">
          <h1>한국어 Flashcards</h1>
          <span className="app-subtitle">TOPIK III vocabulary</span>
        </div>
        <div className="app-header-actions">
          <span className="user-email">{userEmail}</span>
          <button className="btn btn-ghost" onClick={() => supabase.auth.signOut()}>
            Sign out
          </button>
        </div>
      </header>

      <ProgressBar mastered={masteredCount} total={cards.length} />

      <div className="toolbar">
        <div className="filter-group" role="group" aria-label="Study filter">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`btn btn-filter ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setImportOpen((v) => !v)}>
          {importOpen ? 'Hide import' : 'Import vocab'}
        </button>
      </div>

      {importOpen && <ImportPanel onImport={addCards} onClose={() => setImportOpen(false)} />}

      {error && <p className="global-error">{error}</p>}

      {loading ? (
        <p className="loading-text">Loading your cards…</p>
      ) : cards.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any flashcards yet.</p>
          <p className="empty-hint">Click "Import vocab" to upload a CSV or paste a word list to get started.</p>
        </div>
      ) : (
        <FlashcardView
          card={currentCard}
          total={queue.length}
          position={index}
          flipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          onMarkLearned={() => markStatus('learned')}
          onMarkReview={() => markStatus('review')}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  )
}

function SetupNotice() {
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1>Setup required</h1>
        <p className="auth-subtitle">
          Add your Supabase project URL and anon key to a <code>.env</code> file (copy{' '}
          <code>.env.example</code>) and restart the dev server. See <code>README.md</code> for the full
          step-by-step guide.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const { session, loading } = useAuth()

  if (!isSupabaseConfigured) return <SetupNotice />
  if (loading) return <div className="loading-screen">Loading…</div>
  if (!session) return <AuthScreen />

  return <StudyApp userId={session.user.id} userEmail={session.user.email ?? ''} />
}
