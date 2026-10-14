'use client'

import { THEMES, useTheme } from './ThemeContext'

const LABELS = {
  teal: 'Terminal Teal',
  violet: 'Studio Violet',
  orange: 'Signal Orange',
}

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="ft-theme" role="group" aria-label="Color theme">
      <span className="ft-theme-label" aria-hidden="true">
        Theme
      </span>
      {THEMES.map((t) => (
        <button
          key={t}
          type="button"
          className="ft-swatch"
          data-theme-swatch={t}
          aria-pressed={theme === t}
          aria-label={LABELS[t]}
          title={LABELS[t]}
          onClick={() => setTheme(t)}
        />
      ))}
    </div>
  )
}