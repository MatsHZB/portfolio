import { prefersReducedMotion } from '@/utilities/motion'

const nearbyDistance = 80
const followDelay = 0.015 + 0.3 * 0.22
const fadeInDuration = 0.1
const fadeOutDuration = 0.32
const pressInDuration = 0.05
const pressOutDuration = 0.28
const settleThreshold = 0.002

function easeTowards(current: number, target: number, secondsElapsed: number, duration: number) {
  if (prefersReducedMotion) return target

  const next = current + (target - current) * (1 - Math.exp(-secondsElapsed / duration))
  return Math.abs(target - next) < settleThreshold ? target : next
}

export function createSpotlight(card: HTMLElement): () => void {
  const glow = { x: 0, y: 0, strength: 0, pressStrength: 0 }
  const pointer = { x: 0, y: 0, isOnPage: false, isPressed: false }
  let focusedElement: Element | null = null
  let frameId = 0
  let previousFrameTime = 0

  const applyToCss = () => {
    card.style.setProperty('--spotlight-x', `${glow.x.toFixed(1)}px`)
    card.style.setProperty('--spotlight-y', `${glow.y.toFixed(1)}px`)
    card.style.setProperty('--spotlight-strength', glow.strength.toFixed(3))
    card.style.setProperty('--spotlight-press-strength', glow.pressStrength.toFixed(3))
  }

  const isPointerNearby = () => {
    const bounds = card.getBoundingClientRect()
    return (
      pointer.x > bounds.left - nearbyDistance &&
      pointer.x < bounds.right + nearbyDistance &&
      pointer.y > bounds.top - nearbyDistance &&
      pointer.y < bounds.bottom + nearbyDistance
    )
  }

  const glowTarget = () => {
    const bounds = card.getBoundingClientRect()

    if (focusedElement && card.contains(focusedElement)) {
      const focusBounds = focusedElement.getBoundingClientRect()
      return {
        x: focusBounds.left + focusBounds.width / 2 - bounds.left,
        y: focusBounds.top + focusBounds.height / 2 - bounds.top,
        strength: 1,
      }
    }

    if (!pointer.isOnPage) return { x: glow.x, y: glow.y, strength: 0 }

    const x = pointer.x - bounds.left
    const y = pointer.y - bounds.top
    const distanceOutsideCard = Math.hypot(
      Math.max(0, -x, x - bounds.width),
      Math.max(0, -y, y - bounds.height)
    )
    const strength = Math.max(0, 1 - distanceOutsideCard / nearbyDistance) ** 2
    return { x, y, strength }
  }

  const animateFrame = (frameTime: number) => {
    frameId = 0
    const secondsElapsed = Math.min(0.05, Math.max(0.001, (frameTime - previousFrameTime) / 1000))
    previousFrameTime = frameTime

    const target = glowTarget()
    const targetPressStrength = pointer.isPressed && !prefersReducedMotion ? 1 : 0

    if (glow.strength < 0.02 && target.strength > 0) {
      glow.x = target.x
      glow.y = target.y
    }

    glow.x = easeTowards(glow.x, target.x, secondsElapsed, followDelay)
    glow.y = easeTowards(glow.y, target.y, secondsElapsed, followDelay)
    glow.strength = easeTowards(
      glow.strength,
      target.strength,
      secondsElapsed,
      target.strength > glow.strength ? fadeInDuration : fadeOutDuration
    )
    glow.pressStrength = easeTowards(
      glow.pressStrength,
      targetPressStrength,
      secondsElapsed,
      targetPressStrength ? pressInDuration : pressOutDuration
    )
    applyToCss()

    const isSettled =
      Math.abs(target.x - glow.x) <= 0.1 &&
      Math.abs(target.y - glow.y) <= 0.1 &&
      glow.strength === target.strength &&
      glow.pressStrength === targetPressStrength
    if (isSettled) return

    frameId = requestAnimationFrame(animateFrame)
  }

  const startAnimating = () => {
    if (frameId) return
    previousFrameTime = performance.now()
    frameId = requestAnimationFrame(animateFrame)
  }

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = event.clientX
    pointer.y = event.clientY
    pointer.isOnPage = true
    if (glow.strength > 0 || isPointerNearby()) startAnimating()
  }

  const onPointerLeavePage = (event: PointerEvent) => {
    if (event.relatedTarget) return
    pointer.isOnPage = false
    startAnimating()
  }

  const onPointerDown = () => {
    pointer.isPressed = true
    startAnimating()
  }

  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') pointer.isOnPage = false
    pointer.isPressed = false
    startAnimating()
  }

  const onFocusIn = (event: FocusEvent) => {
    if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return
    focusedElement = event.target
    startAnimating()
  }

  const onFocusOut = (event: FocusEvent) => {
    if (event.relatedTarget instanceof Node && card.contains(event.relatedTarget)) return
    focusedElement = null
    startAnimating()
  }

  const onScroll = () => {
    if (pointer.isOnPage && (glow.strength > 0 || isPointerNearby())) startAnimating()
  }

  applyToCss()
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('pointerout', onPointerLeavePage)
  card.addEventListener('pointerdown', onPointerDown)
  card.addEventListener('focusin', onFocusIn)
  card.addEventListener('focusout', onFocusOut)

  return () => {
    cancelAnimationFrame(frameId)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('pointerout', onPointerLeavePage)
    card.removeEventListener('pointerdown', onPointerDown)
    card.removeEventListener('focusin', onFocusIn)
    card.removeEventListener('focusout', onFocusOut)
  }
}
