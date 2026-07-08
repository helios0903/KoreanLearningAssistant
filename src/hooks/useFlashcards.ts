import { useCallback, useEffect, useState } from 'react'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'
import type { CardStatus, Flashcard, NewFlashcard } from '../types'

export function useFlashcards(userId: string | undefined) {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCards = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('flashcards')
      .select('*')
      .order('created_at', { ascending: true })
    if (fetchError) {
      setError(fetchError.message)
    } else {
      setCards(data as Flashcard[])
      setError(null)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  // Real-time sync: any insert/update/delete from another device (or this
  // one) updates local state instantly.
  useEffect(() => {
    if (!userId) return

    const channel = supabase
      .channel(`flashcards-${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'flashcards', filter: `user_id=eq.${userId}` },
        (payload: RealtimePostgresChangesPayload<Flashcard>) => {
          setCards((prev) => {
            if (payload.eventType === 'INSERT') {
              const incoming = payload.new as Flashcard
              if (prev.some((c) => c.id === incoming.id)) return prev
              return [...prev, incoming]
            }
            if (payload.eventType === 'UPDATE') {
              const incoming = payload.new as Flashcard
              return prev.map((c) => (c.id === incoming.id ? incoming : c))
            }
            if (payload.eventType === 'DELETE') {
              const removedId = (payload.old as Partial<Flashcard>).id
              return prev.filter((c) => c.id !== removedId)
            }
            return prev
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const addCards = useCallback(
    async (newCards: NewFlashcard[]) => {
      if (!userId || newCards.length === 0) return { inserted: 0, skipped: 0 }

      const existingKorean = new Set(cards.map((c) => c.korean.trim().toLowerCase()))
      const seen = new Set<string>()
      const rows = newCards
        .filter((c) => c.korean.trim() && c.chinese.trim())
        .filter((c) => {
          const key = c.korean.trim().toLowerCase()
          if (existingKorean.has(key) || seen.has(key)) return false
          seen.add(key)
          return true
        })
        .map((c) => ({
          user_id: userId,
          korean: c.korean.trim(),
          chinese: c.chinese.trim(),
          status: 'new' as CardStatus,
        }))

      const skipped = newCards.length - rows.length
      if (rows.length === 0) return { inserted: 0, skipped }

      const { data, error: insertError } = await supabase.from('flashcards').insert(rows).select()
      if (insertError) {
        setError(insertError.message)
        return { inserted: 0, skipped }
      }
      setCards((prev) => [...prev, ...((data as Flashcard[]) ?? [])])
      return { inserted: rows.length, skipped }
    },
    [userId, cards],
  )

  const updateStatus = useCallback(async (id: string, status: CardStatus) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
    const { error: updateError } = await supabase.from('flashcards').update({ status }).eq('id', id)
    if (updateError) setError(updateError.message)
  }, [])

  return { cards, loading, error, addCards, updateStatus, refresh: fetchCards }
}
