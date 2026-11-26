import { spring } from '@/lib/springs'

export type FlowProfile = { speed: number; spread: number; scale: number; density: number }

const TAU = Math.PI * 2
const FLOW_SAMPLES = 90
const interpolate = (start: number, end: number, amount: number) => start + (end - start) * amount
const unit = (value: number) => Math.max(0, Math.min(1, value))

function flowScale(width: number) {
  return interpolate(0.55, 1, unit((width - 280) / 280))
}

function particles(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    phase: (index + ((index * 7) % 9) / 12) / count,
    rate: 0.86 + ((index * 13) % 17) / 65,
    lane: (((index * 11) % 23) / 22 - 0.5) * 2,
    size: ((index * 19) % 23) / 22,
    angle: (((index * 17) % 31) / 31) * TAU,
  }))
}

const bubbles = particles(46)
const grit = particles(25)
const reflections = particles(19)
const grainColors = ['#583a29', '#926140', '#b08254', '#6b472f']

function centerAt(x: number, phase: number) {
  const opening = 0.35 + 0.65 * Math.abs(x - 0.5) * 2
  return opening * (Math.sin(x * 16 - phase * 2.1) * 5 + Math.sin(x * 29 - phase * 3.6) * 2.2)
}

function thicknessAt(x: number, phase: number, depth: number) {
  const outlet = unit((x - 0.5) * 4)
  const contraction = 0.7 + 0.3 * Math.min(1, Math.abs(x - 0.5) * 8)
  return (
    depth *
    contraction *
    (1 -
      outlet * 0.15 +
      Math.sin(x * 19 - phase * 2.2) * 0.14 +
      Math.cos(x * 31 - phase * 3.9) * 0.1)
  )
}

function drawRibbon(
  context: CanvasRenderingContext2D,
  width: number,
  middle: number,
  phase: number,
  depth: number,
  upper: number,
  lower: number,
) {
  const scale = flowScale(width)
  context.beginPath()
  for (let i = 0; i <= FLOW_SAMPLES; i++) {
    const x = i / FLOW_SAMPLES
    context.lineTo(
      x * width,
      middle + centerAt(x, phase) * scale + thicknessAt(x, phase, depth) * upper,
    )
  }
  for (let i = FLOW_SAMPLES; i >= 0; i--) {
    const x = i / FLOW_SAMPLES
    context.lineTo(
      x * width,
      middle + centerAt(x, phase) * scale + thicknessAt(x, phase, depth) * lower,
    )
  }
  context.closePath()
  context.fill()
}

function drawReflections(
  context: CanvasRenderingContext2D,
  width: number,
  middle: number,
  time: number,
  depth: number,
) {
  const scale = flowScale(width)
  context.fillStyle = '#fff'
  for (const { phase, rate, lane, size } of reflections) {
    const start = (phase + time * rate * 0.18) % 1
    const length = (17 + size * Math.min(76, width * 0.1)) / width
    const height = (0.55 + size * 1.2) * scale

    const coordinates = (index: number, edge: number) => {
      const progress = index / 10
      const x = start + progress * length
      const drift = Math.sin(x * 21 - time * 2 + phase * TAU) * 2 * scale
      const y =
        middle + centerAt(x, time) * scale + thicknessAt(x, time, depth) * lane * 0.73 + drift
      context.lineTo(x * width, y + edge * height * Math.sin(progress * Math.PI))
    }

    context.beginPath()
    for (let i = 0; i <= 10; i++) coordinates(i, -1)
    for (let i = 10; i >= 0; i--) coordinates(i, 1)
    context.closePath()
    context.globalAlpha = 0.16 + 0.36 * (1 - Math.abs(lane))
    context.fill()
  }
  context.globalAlpha = 1
}

function drawBubbles(
  context: CanvasRenderingContext2D,
  width: number,
  middle: number,
  time: number,
  depth: number,
  profile: FlowProfile,
) {
  const scale = flowScale(width)
  const bubbleScale = Math.sqrt(scale)
  for (const { phase, rate, lane, size, angle } of bubbles) {
    const x = (phase + time * rate * 0.2) % 1
    const radius = (0.6 + size ** 2 * Math.min(3.8, width * 0.012)) * profile.scale * bubbleScale
    const wobble = Math.sin(angle + time * 2.8 + x * 16) * profile.spread * 0.42 * scale
    const y =
      middle + centerAt(x, time) * scale + thicknessAt(x, time, depth) * lane * 0.71 + wobble
    context.globalAlpha = (0.55 + 0.45 * profile.density) * unit(Math.min(x, 1 - x) * 11)
    context.beginPath()
    context.ellipse(x * width, y, radius * 1.08, radius, angle, 0, TAU)
    context.fillStyle = size > 0.6 ? '#e8f9ff73' : '#f4fdff'
    context.fill()
    if (size > 0.6) {
      context.lineWidth = 0.8 * bubbleScale
      context.strokeStyle = '#f9ffffe6'
      context.stroke()
      context.beginPath()
      context.arc(x * width - radius * 0.28, y - radius * 0.36, radius * 0.24, 0, TAU)
      context.fillStyle = '#fff'
      context.fill()
    }
  }
  context.globalAlpha = 1
}

function drawSediment(
  context: CanvasRenderingContext2D,
  width: number,
  middle: number,
  time: number,
  depth: number,
  membrane: number,
) {
  const scale = flowScale(width)
  grit.forEach(({ phase, rate, lane, size, angle }, index) => {
    const cycle = (phase + time * rate * 0.27) % 1
    const progress = unit(cycle / 0.8)
    // Slow down at the membrane, linger there, then leave space for the next grain.
    const destination = membrane - size * 4
    const x = interpolate(0, destination, progress + 0.48 * progress ** 5 * (1 - progress))
    const wobble = Math.sin(angle + time * 4.3 + progress * 8) * (1 - progress) * 4 * scale
    const carriedY =
      centerAt(x / width, time) * scale + thicknessAt(x / width, time, depth) * lane * 0.7
    const y = middle + interpolate(carriedY, lane * depth * 0.72, progress ** 4) + wobble
    const radius = (0.65 + size * 2.2) * Math.min(1, width / 440)
    context.globalAlpha = 0.83 * unit(cycle * 12) * unit((1 - cycle) * 7)
    context.fillStyle = grainColors[index % grainColors.length]
    context.beginPath()
    context.ellipse(x, y, radius * 1.28, radius, angle + (1 - progress) * time, 0, TAU)
    context.fill()
  })
  context.globalAlpha = 1
}

export function mountFiltrationAnimation(
  canvas: HTMLCanvasElement,
  membrane: HTMLElement,
  initialProfile: FlowProfile,
) {
  const drawingContext = canvas.getContext('2d')
  const surface = canvas.parentElement
  if (!drawingContext || !surface) return

  const context = drawingContext
  const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)')
  let width = 0
  let height = 0
  let middle = 0
  let membraneX = 0
  let depth = 0
  let water: CanvasGradient
  let shadow: CanvasGradient
  let time = 1.8
  let lastFrame: number | undefined
  let frame: number | undefined
  let visible = false
  let enabled = false
  let target = initialProfile
  let current = { ...target }

  function paint() {
    if (!width || !height) return

    context.clearRect(0, 0, width, height)
    context.fillStyle = shadow
    drawRibbon(context, width, middle + 3 * flowScale(width), time, depth * 1.18, -0.73, 1.13)
    context.fillStyle = water
    drawRibbon(context, width, middle, time, depth, -0.96, 0.95)

    context.globalCompositeOperation = 'source-atop'
    context.fillStyle = '#faffff42'
    drawRibbon(context, width, middle - depth * 0.29, time + 0.25, depth, -0.36, 0.58)
    context.fillStyle = '#16445c1e'
    drawRibbon(context, width, middle + depth * 0.35, time - 0.15, depth, 0.13, 0.8)
    drawReflections(context, width, middle, time, depth)
    drawBubbles(context, width, middle, time, depth, current)
    drawSediment(context, width, middle, time, depth, membraneX)
    context.globalCompositeOperation = 'source-over'
  }

  function tick(now: number) {
    const delta = lastFrame === undefined ? 0 : Math.min((now - lastFrame) / 1000, 0.05)
    lastFrame = now
    const blend = 1 - Math.exp((-3 * delta) / spring.slow.duration)
    current = {
      speed: interpolate(current.speed, target.speed, blend),
      spread: interpolate(current.spread, target.spread, blend),
      scale: interpolate(current.scale, target.scale, blend),
      density: interpolate(current.density, target.density, blend),
    }
    time += delta * current.speed
    paint()
    frame = requestAnimationFrame(tick)
  }

  function syncPlayback() {
    if (enabled && visible && !document.hidden && motionPreference.matches) {
      frame ??= requestAnimationFrame(tick)
    } else {
      if (frame !== undefined) cancelAnimationFrame(frame)
      frame = undefined
      lastFrame = undefined
    }
  }

  function resize() {
    width = canvas.clientWidth
    height = canvas.clientHeight
    if (!width || !height) return

    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0)
    const canvasRect = canvas.getBoundingClientRect()
    const membraneRect = membrane.getBoundingClientRect()
    membraneX = membraneRect.left - canvasRect.left
    middle = membraneRect.top + membraneRect.height / 2 - canvasRect.top
    const transition = membraneX / width
    depth = Math.min(22, height * 0.158) * flowScale(width)

    water = context.createLinearGradient(0, 0, width, 0)
    water.addColorStop(0, '#b7804500')
    water.addColorStop(0.09, '#c29a66c9')
    water.addColorStop(transition * 0.78, '#bc8e54e6')
    water.addColorStop(transition, '#c3a77bd6')
    water.addColorStop(0.53, '#7fb9c8c4')
    water.addColorStop(0.7, '#57b5cdd9')
    water.addColorStop(0.91, '#83cfe1ce')
    water.addColorStop(1, '#a2deed00')

    shadow = context.createLinearGradient(0, 0, width, 0)
    shadow.addColorStop(0, '#9a754b00')
    shadow.addColorStop(0.17, '#9a754b2b')
    shadow.addColorStop(0.45, '#98785326')
    shadow.addColorStop(0.69, '#2d839a2d')
    shadow.addColorStop(1, '#2d839a00')
    paint()
    canvas.dataset.ready = 'true'
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(surface)
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    syncPlayback()
  })
  intersection.observe(surface)
  document.addEventListener('visibilitychange', syncPlayback)
  motionPreference.addEventListener('change', syncPlayback)

  return {
    update(profile: FlowProfile, playing: boolean) {
      target = profile
      enabled = playing
      syncPlayback()
    },
    dispose() {
      resizeObserver.disconnect()
      intersection.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      motionPreference.removeEventListener('change', syncPlayback)
      if (frame !== undefined) cancelAnimationFrame(frame)
    },
  }
}
