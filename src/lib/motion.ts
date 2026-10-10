import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

let lenis: Lenis | undefined

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

const recalculateScrollTriggers = () => ScrollTrigger.refresh()
document.fonts.ready.then(recalculateScrollTriggers)
window.addEventListener('load', recalculateScrollTriggers, { once: true })

export function startSmoothScrolling(): void {
  if (prefersReducedMotion) return

  lenis = new Lenis({ autoRaf: false, anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((timeInSeconds) => lenis?.raf(timeInSeconds * 1000))
  gsap.ticker.lagSmoothing(0)
}

export function smoothScrollTo(scrollPosition: number): void {
  if (lenis) {
    lenis.scrollTo(scrollPosition)
    return
  }
  window.scrollTo({ top: scrollPosition, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

export { gsap, ScrollTrigger, SplitText }
