import { useEffect } from 'react'
import type { Flashcard } from '../types'

interface FlashcardViewProps {
  card: Flashcard | undefined
  total: number
  position: number
  flipped: boolean
  onFlip: () => void
  onMarkLearned: () => void
  onMarkReview: () => void
  onPrev: () => void
  onNext: () => void
}

export function FlashcardView({
  card,
  total,
  position,
  flipped,
  onFlip,
  onMarkLearned,
  onMarkReview,
  onPrev,
  onNext,
}: FlashcardViewProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      const isTyping = target && ['INPUT', 'TEXTAREA'].includes(target.tagName)
      if (isTyping || !card) return

      if (e.code === 'Space') {
        e.preventDefault()
        onFlip()
      } else if (e.key === 'l' || e.key === 'L') {
        onMarkLearned()
      } else if (e.key === 'r' || e.key === 'R') {
        onMarkReview()
      } else if (e.key === 'ArrowLeft') {
        onPrev()
      } else if (e.key === 'ArrowRight') {
        onNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [card, onFlip, onMarkLearned, onMarkReview, onPrev, onNext])

  if (!card) {
    return (
      <div className="empty-state">
        <p>No cards to study in this view.</p>
        <p className="empty-hint">Import some vocabulary or switch the filter above.</p>
      </div>
    )
  }

  return (
    <div className="study-area">
      <p className="card-position">
        {position + 1} / {total}
      </p>

      <div
        className={`flashcard ${flipped ? 'is-flipped' : ''}`}
        onClick={onFlip}
        role="button"
        tabIndex={0}
        aria-label="Flashcard, click or press space to flip"
        onKeyDown={(e) => {
          if (e.key === 'Enter') onFlip()
        }}
      >
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <span className="face-label">한국어</span>
            <span className="face-word">{card.korean}</span>
          </div>
          <div className="flashcard-face flashcard-back">
            <span className="face-label">中文</span>
            <span className="face-word">{card.chinese}</span>
          </div>
        </div>
      </div>

      <p className="flip-hint">Click card or press Space to flip</p>

      <div className="action-row">
        <button className="btn btn-review" onClick={onMarkReview}>
          Need review <kbd>R</kbd>
        </button>
        <button className="btn btn-learned" onClick={onMarkLearned}>
          Learned <kbd>L</kbd>
        </button>
      </div>

      <div className="nav-row">
        <button className="btn btn-ghost" onClick={onPrev} aria-label="Previous card">
          ← Prev
        </button>
        <button className="btn btn-ghost" onClick={onNext} aria-label="Next card">
          Next →
        </button>
      </div>
    </div>
  )
}
