// Empathia Theme System
// Four themes: Dark, Light, Violet, Aurora

const THEMES = {
  dark: {
    name: 'Dark',
    icon: '🌑',
    vars: {
      '--bg': '#0a0a0a',
      '--surface': '#111111',
      '--surface2': '#161616',
      '--border': 'rgba(255,255,255,0.06)',
      '--text': '#e8e8e8',
      '--muted': '#555',
      '--accent': '#7c4dff',
      '--accent2': '#e91e8c',
    }
  },
  light: {
    name: 'Light',
    icon: '☀️',
    vars: {
      '--bg': '#f8f6f2',
      '--surface': '#ffffff',
      '--surface2': '#f0ece4',
      '--border': 'rgba(0,0,0,0.1)',
      '--text': '#1a1a1a',
      '--muted': '#888',
      '--accent': '#5c35cc',
      '--accent2': '#d4006e',
    }
  },
  violet: {
    name: 'Violet',
    icon: '💜',
    vars: {
      '--bg': '#0d0a1a',
      '--surface': '#130f24',
      '--surface2': '#1a1430',
      '--border': 'rgba(124,77,255,0.15)',
      '--text': '#e8e4ff',
      '--muted': '#6b5a8a',
      '--accent': '#a67cff',
      '--accent2': '#ff6bc1',
    }
  },
  aurora: {
    name: 'Aurora',
    icon: '🌊',
    vars: {
      '--bg': '#070d14',
      '--surface': '#0c1520',
      '--surface2': '#111d2a',
      '--border': 'rgba(34,211,238,0.12)',
      '--text': '#d4f0f8',
      '--muted': '#4a7a8a',
      '--accent': '#22d3ee',
      '--accent2': '#6ee7b7',
    }
  }
}

function applyTheme(themeName) {
  const theme = THEMES[themeName]
  if (!theme) return
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  // Add body class for theme-specific overrides
  document.body.className = document.body.className
    .replace(/theme-\w+/g, '').trim()
  document.body.classList.add('theme-' + themeName)
  
  localStorage.setItem('empathia-theme', themeName)
  // Update all theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeName)
    btn.style.opacity = btn.dataset.theme === themeName ? '1' : '0.5'
  })
}

function buildThemeSwitcher(container) {
  if (!container) return
  container.innerHTML = ''
  Object.entries(THEMES).forEach(([key, theme]) => {
    const btn = document.createElement('button')
    btn.className = 'theme-btn'
    btn.dataset.theme = key
    btn.title = theme.name
    btn.textContent = theme.icon
    btn.onclick = () => applyTheme(key)
    btn.style.cssText = `
      background: none;
      border: 1px solid var(--border);
      border-radius: 4px;
      width: 28px;
      height: 28px;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    `
    container.appendChild(btn)
  })
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('empathia-theme') || 'dark'
  applyTheme(saved)
  // Build any theme switchers on the page
  document.querySelectorAll('.theme-switcher').forEach(buildThemeSwitcher)
})
