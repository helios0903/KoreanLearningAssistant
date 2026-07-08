import { useRef, useState, type ChangeEvent } from 'react'
import { parseCsvFile, parsePastedText } from '../utils/parseVocab'
import type { NewFlashcard } from '../types'

interface ImportPanelProps {
  onImport: (cards: NewFlashcard[]) => Promise<{ inserted: number; skipped: number }>
  onClose: () => void
}

export function ImportPanel({ onImport, onClose }: ImportPanelProps) {
  const [pasted, setPasted] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function runImport(cards: NewFlashcard[]) {
    if (cards.length === 0) {
      setStatus('No valid rows found. Expected "Korean,Chinese" per line.')
      return
    }
    setBusy(true)
    const { inserted, skipped } = await onImport(cards)
    setBusy(false)
    setStatus(
      `Added ${inserted} card${inserted === 1 ? '' : 's'}` +
        (skipped > 0 ? ` (${skipped} skipped as duplicates/blank).` : '.'),
    )
    setPasted('')
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      const cards = await parseCsvFile(file)
      await runImport(cards)
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Failed to read CSV file.')
      setBusy(false)
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handlePasteImport() {
    const cards = parsePastedText(pasted)
    await runImport(cards)
  }

  return (
    <div className="import-panel">
      <div className="import-header">
        <h2>Import vocabulary</h2>
        <button className="btn btn-ghost" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="import-section">
        <label className="import-label" htmlFor="csv-file">
          Upload CSV file
        </label>
        <input
          id="csv-file"
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFile}
          disabled={busy}
        />
        <p className="import-hint">Two columns: Korean word, Chinese definition. Header row optional.</p>
      </div>

      <div className="import-section">
        <label className="import-label" htmlFor="paste-list">
          Or paste a vocab list
        </label>
        <textarea
          id="paste-list"
          rows={8}
          placeholder={'안녕하세요,你好\n감사합니다,谢谢\n...'}
          value={pasted}
          onChange={(e) => setPasted(e.target.value)}
          disabled={busy}
        />
        <p className="import-hint">One pair per line, separated by a comma, tab, or " - ".</p>
        <button className="btn btn-primary" onClick={handlePasteImport} disabled={busy || !pasted.trim()}>
          {busy ? 'Importing…' : 'Import pasted list'}
        </button>
      </div>

      {status && <p className="import-status">{status}</p>}
    </div>
  )
}
