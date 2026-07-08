import Papa from 'papaparse'
import type { NewFlashcard } from '../types'

const HEADER_WORDS = new Set(['korean', '한국어', 'word', 'front', 'term'])

export function parseCsvFile(file: File): Promise<NewFlashcard[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(file, {
      skipEmptyLines: true,
      complete: (results) => resolve(rowsToCards(results.data)),
      error: (err: Error) => reject(err),
    })
  })
}

export function parsePastedText(text: string): NewFlashcard[] {
  const rows = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(splitLine)
  return rowsToCards(rows)
}

function splitLine(line: string): string[] {
  if (line.includes('\t')) return line.split('\t')
  if (line.includes(',')) return line.split(',')
  if (line.includes(' - ')) return line.split(' - ')
  if (line.includes('：')) return line.split('：')
  if (line.includes(':')) return line.split(':')
  return [line]
}

function rowsToCards(rows: string[][]): NewFlashcard[] {
  const cards: NewFlashcard[] = []
  rows.forEach((row, index) => {
    const korean = (row[0] ?? '').trim()
    const chinese = (row[1] ?? '').trim()
    if (!korean || !chinese) return
    if (index === 0 && HEADER_WORDS.has(korean.toLowerCase())) return
    cards.push({ korean, chinese })
  })
  return cards
}
