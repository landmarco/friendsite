'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeContext'

// Port of wxdu.org's GPU-shader noise-square background (MIT), made theme-aware:
// the wash hue is anchored to each theme's --wash-* custom property instead of
// wandering the full rainbow, and the squares take the theme's --square color.
// All color values are read from the live stylesheet, so the shader always
// matches the active data-theme without duplicating theme data in JS.

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uSize;
  uniform vec3 uBgColor;
  uniform vec3 uSquareColor;
  uniform sampler2D uNoiseTex;
  varying vec2 vUv;

  const float INV_NOISE_TEX_SIZE = 0.00390625;

  float hash(vec3 p) {
    vec2 uv = (p.xy + p.z * 37.0) * INV_NOISE_TEX_SIZE;
    return texture2D(uNoiseTex, uv).x;
  }

  float snoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = p - i;
    f = f * f * (3.0 - 2.0 * f);

    float n000 = hash(i + vec3(0.0, 0.0, 0.0));
    float n100 = hash(i + vec3(1.0, 0.0, 0.0));
    float n010 = hash(i + vec3(0.0, 1.0, 0.0));
    float n110 = hash(i + vec3(1.0, 1.0, 0.0));
    float n001 = hash(i + vec3(0.0, 0.0, 1.0));
    float n101 = hash(i + vec3(1.0, 0.0, 1.0));
    float n011 = hash(i + vec3(0.0, 1.0, 1.0));
    float n111 = hash(i + vec3(1.0, 1.0, 1.0));

    float x00 = mix(n000, n100, f.x);
    float x10 = mix(n010, n110, f.x);
    float x01 = mix(n001, n101, f.x);
    float x11 = mix(n011, n111, f.x);

    float y0 = mix(x00, x10, f.y);
    float y1 = mix(x01, x11, f.y);

    return mix(y0, y1, f.z) * 2.0 - 1.0;
  }

  void main() {
    vec2 fragCoord = vec2(vUv.x, 1.0 - vUv.y) * uResolution;
    vec3 bgColor = uBgColor;

    vec2 cell = floor(fragCoord / uSize);
    vec2 cellCenter = (cell + 0.5) * uSize;
    vec2 localPos = fragCoord - cellCenter;

    float n = snoise(vec3(cell * 0.1, uTime * 0.15));
    float s = (n * 0.5 + 0.5) * uSize * 1.7;

    float d = max(abs(localPos.x), abs(localPos.y));
    float mask = 1.0 - smoothstep(s * 0.5 - 1.0, s * 0.5 + 1.0, d);

    vec3 color = mix(bgColor, uSquareColor, mask);
    gl_FragColor = vec4(color, 1.0);
  }
`

function mod289(x) { return x - Math.floor(x * (1 / 289)) * 289 }
function permute(x) { return mod289((x * 34 + 1) * x) }
function taylorInvSqrt(r) { return 1.79284291400159 - 0.85373472095314 * r }

function snoise3(vx, vy, vz) {
  const CX = 1 / 6, CY = 1 / 3
  const dvy = (vx + vy + vz) * CY
  let ix = Math.floor(vx + dvy), iy = Math.floor(vy + dvy), iz = Math.floor(vz + dvy)
  const dix = (ix + iy + iz) * CX
  const x0 = [vx - ix + dix, vy - iy + dix, vz - iz + dix]

  const g = [x0[0] >= x0[1] ? 1 : 0, x0[1] >= x0[2] ? 1 : 0, x0[2] >= x0[0] ? 1 : 0]
  const l = [1 - g[0], 1 - g[1], 1 - g[2]]
  const i1 = [Math.min(g[0], l[2]), Math.min(g[1], l[0]), Math.min(g[2], l[1])]
  const i2 = [Math.max(g[0], l[2]), Math.max(g[1], l[0]), Math.max(g[2], l[1])]

  const x1 = [x0[0] - i1[0] + CX, x0[1] - i1[1] + CX, x0[2] - i1[2] + CX]
  const x2 = [x0[0] - i2[0] + CY, x0[1] - i2[1] + CY, x0[2] - i2[2] + CY]
  const x3 = [x0[0] - 0.5, x0[1] - 0.5, x0[2] - 0.5]

  ix = mod289(ix); iy = mod289(iy); iz = mod289(iz)
  let p = [0, i1[2], i2[2], 1].map((v) => permute(iz + v))
  p = p.map((pv, k) => permute(pv + iy + [0, i1[1], i2[1], 1][k]))
  p = p.map((pv, k) => permute(pv + ix + [0, i1[0], i2[0], 1][k]))

  const n_ = 1 / 7
  const nsx = n_ * 2, nsy = n_ * 0.5 - 1
  const j = p.map((pv) => pv % 49)
  const x_ = j.map((jv) => Math.floor(jv / 7))
  const y_ = j.map((jv, k) => jv - 7 * x_[k])
  const xx = x_.map((v) => v * nsx + nsy)
  const yy = y_.map((v) => v * nsx + nsy)
  const h = xx.map((v, k) => 1 - Math.abs(v) - Math.abs(yy[k]))

  const b0 = [xx[0], xx[1], yy[0], yy[1]]
  const b1 = [xx[2], xx[3], yy[2], yy[3]]
  const s0 = b0.map((v) => Math.floor(v) * 2 + 1)
  const s1 = b1.map((v) => Math.floor(v) * 2 + 1)
  const sh = h.map((v) => -(v <= 0 ? 1 : 0))

  const a0 = [b0[0] + s0[0] * sh[0], b0[2] + s0[2] * sh[0], b0[1] + s0[1] * sh[1], b0[3] + s0[3] * sh[1]]
  const a1 = [b1[0] + s1[0] * sh[2], b1[2] + s1[2] * sh[2], b1[1] + s1[1] * sh[3], b1[3] + s1[3] * sh[3]]

  let g0 = [a0[0], a0[1], h[0]]
  let g1 = [a0[2], a0[3], h[1]]
  let g2 = [a1[0], a1[1], h[2]]
  let g3 = [a1[2], a1[3], h[3]]
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const norm = [g0, g1, g2, g3].map((gv) => taylorInvSqrt(dot3(gv, gv)))
  g0 = g0.map((v) => v * norm[0]); g1 = g1.map((v) => v * norm[1])
  g2 = g2.map((v) => v * norm[2]); g3 = g3.map((v) => v * norm[3])

  let m = [dot3(x0, x0), dot3(x1, x1), dot3(x2, x2), dot3(x3, x3)].map((v) => Math.max(0.6 - v, 0))
  m = m.map((v) => v * v)
  const mm = m.map((v) => v * v)
  return 42 * (mm[0] * dot3(g0, x0) + mm[1] * dot3(g1, x1) + mm[2] * dot3(g2, x2) + mm[3] * dot3(g3, x3))
}

function hsb2rgb(hue, sat, bri) {
  return [0, 4, 2].map((o) => {
    let v = (((hue * 6 + o) % 6) + 6) % 6
    v = Math.min(Math.max(Math.abs(v - 3) - 1, 0), 1)
    v = v * v * (3 - 2 * v)
    return bri * (1 + (v - 1) * sat)
  })
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function createNoiseTextureData(size = 256) {
  const seed = 42 // fixed seed: same square pattern on every load
  const data = new Uint8Array(size * size * 4)
  for (let i = 0; i < size * size; i++) {
    data[i * 4 + 0] = seededRandom(seed + i * 0.001) * 255
    data[i * 4 + 1] = seededRandom(seed + i * 0.001 + 1000) * 255
    data[i * 4 + 2] = seededRandom(seed + i * 0.001 + 2000) * 255
    data[i * 4 + 3] = 255
  }
  return data
}

const BASE_TIME_SCALE = 0.25
const HUE_START_OFFSET = 36

// Read the active theme's wash params straight from the stylesheet.
function readWash() {
  const cs = getComputedStyle(document.documentElement)
  const num = (name) => parseFloat(cs.getPropertyValue(name))
  return {
    center: num('--wash-hue'),
    range: num('--wash-range'),
    sat: num('--wash-sat'),
    bri: num('--wash-bri'),
  }
}

// Resolve a CSS color (e.g. the --square rgb() string) into 0..1 components.
function readSquare() {
  const cs = getComputedStyle(document.documentElement)
  const color = cs.getPropertyValue('--square').trim()
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255]
}

export default function Background({ size = 17 }) {
  const containerRef = useRef(null)
  const { theme } = useTheme()
  const [supported, setSupported] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true)
      return
    }

    let renderer, program, canvas
    let rafId = null
    let resizeRafId = null
    let onResize, onActivityChange
    let destroyed = false

    import('ogl').then(({ Renderer, Program, Mesh, Triangle, Texture }) => {
      if (destroyed || !containerRef.current) return

      const probe = document.createElement('canvas')
      let probeGl = null
      try {
        probeGl = probe.getContext('webgl2', {
          alpha: false,
          antialias: false,
          powerPreference: 'low-power',
          failIfMajorPerformanceCaveat: true,
        })
      } catch {
        probeGl = null
      }
      if (!probeGl) {
        setSupported(false)
        return
      }

      const wash = readWash()
      const squareColor = readSquare()

      canvas = document.createElement('canvas')
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      containerRef.current.appendChild(canvas)

      renderer = new Renderer({ canvas, dpr: 1, alpha: false, antialias: false, powerPreference: 'low-power' })
      const gl = renderer.gl

      const noiseSize = 256
      const noiseTexture = new Texture(gl, {
        image: createNoiseTextureData(noiseSize),
        width: noiseSize,
        height: noiseSize,
        wrapS: gl.REPEAT,
        wrapT: gl.REPEAT,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        generateMipmaps: false,
      })

      const geometry = new Triangle(gl)
      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [window.innerWidth, window.innerHeight] },
          uSize: { value: size },
          uBgColor: { value: hsb2rgb(wash.center, wash.sat, wash.bri) },
          uSquareColor: { value: squareColor },
          uNoiseTex: { value: noiseTexture },
        },
      })
      const mesh = new Mesh(gl, { geometry, program })

      const targetFps = 30
      const frameInterval = 1000 / targetFps
      let animTime = HUE_START_OFFSET
      let lastTs = null

      const renderFrame = () => {
        program.uniforms.uTime.value = animTime
        const n = snoise3(animTime * 0.03, 0, 0) * 0.5 + 0.5
        // Clamp the drift to the theme's hue band instead of the full rainbow.
        const hue = Math.min(1, Math.max(0, wash.center + (n - 0.5) * wash.range))
        program.uniforms.uBgColor.value = hsb2rgb(hue, wash.sat, wash.bri)
        renderer.render({ scene: mesh })
      }

      let lastW = 0, lastH = 0
      const applyResize = () => {
        resizeRafId = null
        const w = window.innerWidth, h = window.innerHeight
        if (w === lastW && h === lastH) return
        lastW = w; lastH = h
        renderer.setSize(w, h)
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height]
        renderFrame()
      }
      const resize = () => {
        if (resizeRafId === null) resizeRafId = requestAnimationFrame(applyResize)
      }
      onResize = resize
      applyResize()
      window.addEventListener('resize', onResize)

      const update = (t) => {
        rafId = requestAnimationFrame(update)
        if (lastTs === null) lastTs = t
        const elapsed = t - lastTs
        if (elapsed < frameInterval) return
        lastTs = t - (elapsed % frameInterval)
        animTime += (elapsed / 1000) * BASE_TIME_SCALE
        renderFrame()
      }

      const isActive = () => !document.hidden
      const startLoop = () => {
        if (rafId || !isActive()) return
        lastTs = null
        rafId = requestAnimationFrame(update)
      }
      const stopLoop = () => {
        if (rafId) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      }
      startLoop()
      onActivityChange = () => (isActive() ? startLoop() : stopLoop())
      document.addEventListener('visibilitychange', onActivityChange)
    })

    return () => {
      destroyed = true
      if (rafId) cancelAnimationFrame(rafId)
      if (resizeRafId) cancelAnimationFrame(resizeRafId)
      if (onResize) window.removeEventListener('resize', onResize)
      if (onActivityChange) document.removeEventListener('visibilitychange', onActivityChange)
      if (renderer) {
        const loseCtx = renderer.gl.getExtension('WEBGL_lose_context')
        if (loseCtx) loseCtx.loseContext()
      }
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [theme, size])

  if (!supported || reducedMotion) {
    return <div className="ft-background" style={{ background: 'var(--bg)' }} aria-hidden="true" />
  }

  return <div ref={containerRef} className="ft-background" aria-hidden="true" />
}