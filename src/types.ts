export type CardStatus = 'new' | 'learned' | 'review'

export interface Flashcard {
  id: string
  user_id: string
  korean: string
  chinese: string
  status: CardStatus
  created_at: string
  updated_at: string
}

export interface NewFlashcard {
  korean: string
  chinese: string
}

export type StudyFilter = 'due' | 'all' | 'review'
