import { reactive, readonly } from 'vue'
import { smoothScrollTo } from '@/utilities/motion'

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Over mij' },
  { id: 'projecten', label: 'Projecten' },
  { id: 'vaardigheden', label: 'Vaardigheden' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

const activationLineStartRatio = 0.4
const arrivalTolerance = 2
const manualScrollKeys = new Set([' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'])

const state = reactive({
  activeIndex: 0,
  progress: 0,
})

export const activeSection = readonly(state)

let clickedSectionIndex = -1
let indexBeforeClick = 0
let isUpdateRequested = false

function documentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY
}

function anchorScrollPosition(element: HTMLElement): number {
  return documentTop(element) - (parseFloat(getComputedStyle(element).scrollMarginTop) || 0)
}

function sectionStartPositions(maximumScroll: number): number[] {
  const viewportHeight = window.innerHeight
  const activationLineSpeed = 1 + ((1 - activationLineStartRatio) * viewportHeight) / maximumScroll
  let previousAnchor = 0

  return sections.map((section, sectionIndex) => {
    const element = document.getElementById(section.id)
    if (!element || sectionIndex === 0) return 0

    const reachedByActivationLine =
      (documentTop(element) - activationLineStartRatio * viewportHeight) / activationLineSpeed
    const justAfterPreviousAnchor = previousAnchor < maximumScroll ? previousAnchor + 1 : 0
    previousAnchor = anchorScrollPosition(element)

    return Math.min(Math.max(reachedByActivationLine, justAfterPreviousAnchor, 0), maximumScroll)
  })
}

function respectClickedSection(scrolledIndex: number, maximumScroll: number): number {
  const clickedElement = document.getElementById(sections[clickedSectionIndex]?.id ?? '')
  if (!clickedElement) return scrolledIndex

  const clickedTarget = Math.min(anchorScrollPosition(clickedElement), maximumScroll)
  if (Math.abs(window.scrollY - clickedTarget) <= arrivalTolerance) return clickedSectionIndex
  if (clickedSectionIndex > indexBeforeClick) return Math.min(scrolledIndex, clickedSectionIndex)
  return Math.max(scrolledIndex, clickedSectionIndex)
}

function update() {
  isUpdateRequested = false
  const scrollY = window.scrollY
  const maximumScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const starts = sectionStartPositions(maximumScroll)
  const scrolledIndex = starts.reduce(
    (lastPassed, start, sectionIndex) => (scrollY >= start ? sectionIndex : lastPassed),
    0
  )
  const activeIndex = respectClickedSection(scrolledIndex, maximumScroll)
  const start = starts[activeIndex] ?? 0
  const end = starts[activeIndex + 1] ?? maximumScroll

  state.activeIndex = activeIndex
  state.progress = end > start ? Math.min(Math.max((scrollY - start) / (end - start), 0), 1) : 1
}

function requestUpdate() {
  if (isUpdateRequested) return
  isUpdateRequested = true
  requestAnimationFrame(update)
}

function rememberClickedSection(sectionId: string) {
  const sectionIndex = sections.findIndex((section) => section.id === sectionId)
  if (sectionIndex === -1) return

  indexBeforeClick = state.activeIndex
  clickedSectionIndex = sectionIndex
  requestUpdate()
}

function forgetClickedSection(event: Event) {
  if (clickedSectionIndex === -1) return
  if (event instanceof KeyboardEvent && !manualScrollKeys.has(event.key)) return

  clickedSectionIndex = -1
  requestUpdate()
}

function onDocumentClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return

  const sectionId = event.target.closest('a[href^="#"]')?.getAttribute('href')?.slice(1)
  if (sectionId) rememberClickedSection(sectionId)
}

export function startActiveSectionTracking(): void {
  update()
  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate)
  window.addEventListener('wheel', forgetClickedSection, { passive: true })
  window.addEventListener('touchstart', forgetClickedSection, { passive: true })
  window.addEventListener('keydown', forgetClickedSection)
  document.addEventListener('click', onDocumentClick)
}

export function scrollToSection(sectionId: SectionId): void {
  const element = document.getElementById(sectionId)
  if (!element) return

  rememberClickedSection(sectionId)
  smoothScrollTo(anchorScrollPosition(element))
}
