import confetti from 'canvas-confetti'

export function fireConfettiShow() {
  const duration = 2 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      clearInterval(interval)
      return
    }

    const particleCount = 3000 * (timeLeft / duration)
    confetti({
      ...defaults,
      particleCount: Math.floor(particleCount / 10),
      origin: { x: Math.random(), y: Math.random() - 0.2 },
    })
  }, 250)
}
