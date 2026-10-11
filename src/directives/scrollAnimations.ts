import type { Directive } from 'vue'
import { gsap, prefersReducedMotion } from '@/utilities/motion'

type ParallaxProperty = 'y' | 'yPercent'

const animations = new WeakMap<HTMLElement, gsap.core.Tween>()

function stopAnimation(element: HTMLElement) {
  animations.get(element)?.scrollTrigger?.kill()
  animations.get(element)?.kill()
}

export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(element, { value: delayInMilliseconds = 0 }) {
    if (prefersReducedMotion) return

    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        delay: delayInMilliseconds / 1000,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: element, start: 'top 94%', once: true },
      }
    )
    animations.set(element, animation)
  },
  unmounted: stopAnimation,
}

export const parallax: Directive<HTMLElement, number, ParallaxProperty> = {
  mounted(element, { value: endOffset, arg: property = 'yPercent' }) {
    if (prefersReducedMotion) return

    const animation = gsap.fromTo(
      element,
      { [property]: -endOffset },
      {
        [property]: endOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
    animations.set(element, animation)
  },
  unmounted: stopAnimation,
}
