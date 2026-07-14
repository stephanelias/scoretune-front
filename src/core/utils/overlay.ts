export function openOverlay(modalId: string) {
  const modal = document.getElementById(modalId)
  if (!modal || !window.HSOverlay) return

  window.HSOverlay.autoInit()
  window.HSOverlay.open(modal)
}

export function closeOverlay(modalId: string) {
  const modal = document.getElementById(modalId)
  if (!modal) return

  window.HSOverlay?.close(modal)
}
