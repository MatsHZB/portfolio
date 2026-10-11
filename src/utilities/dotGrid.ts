import { gsap } from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { prefersReducedMotion } from '@/utilities/motion'

gsap.registerPlugin(InertiaPlugin)

const dotSize = 4
const dotSpacing = 22
const highlightRadius = 130
const minimumPushSpeed = 100
const maximumPointerSpeed = 5000
const clickWaveRadius = 220
const clickWaveStrength = 4
const pushResistance = 750
const returnDuration = 1.5
const pointerUpdateInterval = 50
const pointerOutsideCanvas = -9999

interface Dot {
  homeX: number
  homeY: number
  offsetX: number
  offsetY: number
  isBeingPushed: boolean
}

interface ColorChannels {
  red: number
  green: number
  blue: number
}

function readCssVariable(variableName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}

function toColorChannels(hexadecimalColor: string): ColorChannels {
  const [red = 0, green = 0, blue = 0] = (hexadecimalColor.match(/[a-f\d]{2}/gi) ?? []).map(
    (pair) => parseInt(pair, 16)
  )
  return { red, green, blue }
}

function mixColors(from: ColorChannels, to: ColorChannels, amount: number): string {
  const mixChannel = (start: number, end: number) => Math.round(start + (end - start) * amount)
  return `rgb(${mixChannel(from.red, to.red)},${mixChannel(from.green, to.green)},${mixChannel(from.blue, to.blue)})`
}

export function createDotGrid(canvas: HTMLCanvasElement, interactionArea: HTMLElement): () => void {
  const context = canvas.getContext('2d')
  const container = canvas.parentElement
  if (!context || !container) return () => {}

  let dotColor = readCssVariable('--color-dot')
  let dotColorChannels = toColorChannels(dotColor)
  let highlightColorChannels = toColorChannels(readCssVariable('--color-accent'))
  const dotShape = new Path2D()
  dotShape.arc(0, 0, dotSize / 2, 0, Math.PI * 2)

  let dots: Dot[] = []
  let width = 0
  let height = 0
  let frameId = 0
  let isOnScreen = false
  const pointer = {
    x: pointerOutsideCanvas,
    y: pointerOutsideCanvas,
    previousX: 0,
    previousY: 0,
    previousTime: 0,
  }

  const draw = () => {
    context.clearRect(0, 0, width, height)
    for (const dot of dots) {
      const distanceToPointer = Math.hypot(dot.homeX - pointer.x, dot.homeY - pointer.y)
      const closeness = 1 - distanceToPointer / highlightRadius

      context.save()
      context.translate(dot.homeX + dot.offsetX, dot.homeY + dot.offsetY)
      context.fillStyle =
        closeness > 0 ? mixColors(dotColorChannels, highlightColorChannels, closeness) : dotColor
      context.fill(dotShape)
      context.restore()
    }
  }

  const placeDots = () => {
    const bounds = container.getBoundingClientRect()
    const pixelRatio = window.devicePixelRatio || 1
    width = bounds.width
    height = bounds.height
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

    const cellSize = dotSize + dotSpacing
    const columns = Math.floor((width + dotSpacing) / cellSize)
    const rows = Math.floor((height + dotSpacing) / cellSize)
    const firstX = (width - (cellSize * columns - dotSpacing)) / 2 + dotSize / 2
    const firstY = (height - (cellSize * rows - dotSpacing)) / 2 + dotSize / 2

    dots = Array.from({ length: rows * columns }, (_, index) => ({
      homeX: firstX + (index % columns) * cellSize,
      homeY: firstY + Math.floor(index / columns) * cellSize,
      offsetX: 0,
      offsetY: 0,
      isBeingPushed: false,
    }))
    draw()
  }

  const drawEveryFrame = () => {
    draw()
    frameId = requestAnimationFrame(drawEveryFrame)
  }

  const startDrawing = () => {
    if (frameId || !isOnScreen || document.hidden) return
    frameId = requestAnimationFrame(drawEveryFrame)
  }

  const stopDrawing = () => {
    cancelAnimationFrame(frameId)
    frameId = 0
  }

  const pushDot = (dot: Dot, pushX: number, pushY: number) => {
    dot.isBeingPushed = true
    gsap.killTweensOf(dot)
    gsap.to(dot, {
      inertia: { offsetX: pushX, offsetY: pushY, resistance: pushResistance },
      onComplete: () => {
        gsap.to(dot, {
          offsetX: 0,
          offsetY: 0,
          duration: returnDuration,
          ease: 'elastic.out(1,0.75)',
        })
        dot.isBeingPushed = false
      },
    })
  }

  const onPointerMove = (event: PointerEvent) => {
    const now = performance.now()
    const millisecondsSincePrevious = now - pointer.previousTime
    if (millisecondsSincePrevious < pointerUpdateInterval) return

    const pixelsPerSecond = 1000 / millisecondsSincePrevious
    const measuredSpeedX = (event.clientX - pointer.previousX) * pixelsPerSecond
    const measuredSpeedY = (event.clientY - pointer.previousY) * pixelsPerSecond
    const measuredSpeed = Math.hypot(measuredSpeedX, measuredSpeedY)
    const speedCorrection =
      measuredSpeed > maximumPointerSpeed ? maximumPointerSpeed / measuredSpeed : 1
    const speed = measuredSpeed * speedCorrection
    const speedX = measuredSpeedX * speedCorrection
    const speedY = measuredSpeedY * speedCorrection

    const bounds = canvas.getBoundingClientRect()
    pointer.previousTime = now
    pointer.previousX = event.clientX
    pointer.previousY = event.clientY
    pointer.x = event.clientX - bounds.left
    pointer.y = event.clientY - bounds.top

    if (speed <= minimumPushSpeed) return

    for (const dot of dots) {
      const isNearPointer =
        Math.hypot(dot.homeX - pointer.x, dot.homeY - pointer.y) < highlightRadius
      if (!isNearPointer || dot.isBeingPushed) continue

      pushDot(dot, dot.homeX - pointer.x + speedX * 0.005, dot.homeY - pointer.y + speedY * 0.005)
    }
  }

  const onPointerLeave = () => {
    pointer.x = pointerOutsideCanvas
    pointer.y = pointerOutsideCanvas
  }

  const onClick = (event: MouseEvent) => {
    const bounds = canvas.getBoundingClientRect()
    const clickX = event.clientX - bounds.left
    const clickY = event.clientY - bounds.top

    for (const dot of dots) {
      const distanceToClick = Math.hypot(dot.homeX - clickX, dot.homeY - clickY)
      if (distanceToClick >= clickWaveRadius || dot.isBeingPushed) continue

      const waveStrength = clickWaveStrength * (1 - distanceToClick / clickWaveRadius)
      pushDot(dot, (dot.homeX - clickX) * waveStrength, (dot.homeY - clickY) * waveStrength)
    }
  }

  const refreshColors = () => {
    dotColor = readCssVariable('--color-dot')
    dotColorChannels = toColorChannels(dotColor)
    highlightColorChannels = toColorChannels(readCssVariable('--color-accent'))
    draw()
  }

  const resizeObserver = new ResizeObserver(placeDots)
  resizeObserver.observe(container)
  const themeObserver = new MutationObserver(refreshColors)
  themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] })

  if (prefersReducedMotion) {
    placeDots()
    return () => {
      resizeObserver.disconnect()
      themeObserver.disconnect()
    }
  }

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isOnScreen = Boolean(entry?.isIntersecting)
    if (isOnScreen) startDrawing()
    else stopDrawing()
  })
  const onTabVisibilityChange = () => (document.hidden ? stopDrawing() : startDrawing())

  visibilityObserver.observe(container)
  document.addEventListener('visibilitychange', onTabVisibilityChange)
  interactionArea.addEventListener('pointermove', onPointerMove, { passive: true })
  interactionArea.addEventListener('pointerleave', onPointerLeave)
  interactionArea.addEventListener('click', onClick)

  return () => {
    stopDrawing()
    resizeObserver.disconnect()
    themeObserver.disconnect()
    visibilityObserver.disconnect()
    document.removeEventListener('visibilitychange', onTabVisibilityChange)
    interactionArea.removeEventListener('pointermove', onPointerMove)
    interactionArea.removeEventListener('pointerleave', onPointerLeave)
    interactionArea.removeEventListener('click', onClick)
    dots.forEach((dot) => gsap.killTweensOf(dot))
  }
}
