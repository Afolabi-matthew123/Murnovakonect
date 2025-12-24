export function applyNavigationGlow(confidence: number) {
  const root = document.documentElement

  if (confidence > 0.85) {
    root.style.setProperty('--nav-glow', 'rgba(0,255,180,0.6)')
  } else if (confidence > 0.6) {
    root.style.setProperty('--nav-glow', 'rgba(255,180,0,0.6)')
  } else {
    root.style.setProperty('--nav-glow', 'rgba(255,80,80,0.8)')
  }
}
