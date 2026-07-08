interface ProgressBarProps {
  mastered: number
  total: number
}

export function ProgressBar({ mastered, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((mastered / total) * 100)
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">
        {mastered} / {total} mastered ({pct}%)
      </span>
    </div>
  )
}
