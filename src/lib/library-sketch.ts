/**
 * Spirit Library cover art, built at build time.
 *
 * A small 3D model of a neoclassical library — a domed tower crowned with
 * a drum colonnade, balustrade, lantern and finial — is put in front of a
 * three-quarter camera (yaw plus a low upward pitch, so verticals converge
 * the way they do when you look up at a monument) and projected to 2D.
 * The projected edges are kept exact: no wobble, no overshoot, no double
 * tracing — ruled straight segments with true corners, fired with the
 * density of a fine ink perspective: dentils, modillions, quoins, ribs.
 *
 * Runs once in the component's frontmatter. The browser only ever receives
 * plain `<path>` elements — no geometry, no maths.
 *
 * Stages are the draw order the client script timelines:
 *   1 massing · 2 steps · 3 columns · 4 order · 5 openings · 6 shade
 */

export type Stroke = {
  /** Path data for the 1200×900 viewBox. */
  d: string
  /** Draw-order bucket. */
  stage: number
  /** w1 heaviest (silhouette) → w3 (detail), hatch for shading. */
  cls: "w1" | "w2" | "w3" | "hatch"
}

type V3 = [number, number, number]
type Pt = [number, number]

const STAGE = {
  mass: 1,
  steps: 2,
  columns: 3,
  order: 4,
  open: 5,
  shade: 6,
}

/* ------------------------------------------------------------- randomness */

/** mulberry32 — spacing decisions repeat identically on every build. */
function noise(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ---------------------------------------------------------------- camera */

const YAW = (34 * Math.PI) / 180
const PITCH = (7 * Math.PI) / 180
const FOCAL = 1270
const EYE: V3 = [0, 3.4, -36]
const ORIGIN: Pt = [560, 600]

const cosY = Math.cos(YAW)
const sinY = Math.sin(YAW)
const cosP = Math.cos(PITCH)
const sinP = Math.sin(PITCH)

function project(p: V3): Pt {
  const x = p[0] * cosY + p[2] * sinY - EYE[0]
  const y = p[1] - EYE[1]
  const z = -p[0] * sinY + p[2] * cosY - EYE[2]
  const depth = y * sinP + z * cosP
  const up = y * cosP - z * sinP
  return [
    Math.round((ORIGIN[0] + (FOCAL * x) / depth) * 10) / 10,
    Math.round((ORIGIN[1] - (FOCAL * up) / depth) * 10) / 10,
  ]
}

/* -------------------------------------------------------------- pen work */

type RoughOpts = {
  /** Retained for call-site compatibility; linework is now exact. */
  amp?: number
  over?: number
  double?: number
  /** Corner points stay put when false (open runs only). */
  closed?: boolean
}

const round = (v: number) => Math.round(v * 10) / 10

/**
 * Turn a run of projected points into exact ruled linework: straight
 * segments through every point, corners met precisely, ends trimmed rather
 * than overshooting — the draughtsman's line, not the pen's.
 */
function rough(raw: Pt[], _rnd: () => number, opts: RoughOpts = {}): string {
  const pts = raw.map((p) => [p[0], p[1]] as Pt)
  const body = opts.closed ? [...pts, pts[0]] : pts
  const run = body
    .slice(1)
    .map((p) => `L ${round(p[0])} ${round(p[1])}`)
    .join(" ")
  return `M ${round(body[0][0])} ${round(body[0][1])} ${run}`
}

/* --------------------------------------------------------- model helpers */

const strokes: Stroke[] = []
const rnd = noise(4177)

/** Split a projected run so long edges stay light to rasterise. */
function sample(pts: Pt[]): Pt[] {
  const out: Pt[] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    const len = Math.hypot(b[0] - a[0], b[1] - a[1])
    const n = Math.max(1, Math.min(8, Math.round(len / 55)))
    for (let k = 0; k < n; k++) {
      out.push([a[0] + ((b[0] - a[0]) * k) / n, a[1] + ((b[1] - a[1]) * k) / n])
    }
  }
  out.push(pts[pts.length - 1])
  return out
}

/** One path made of several runs — a whole column, a row of ticks. */
function group(
  stage: number,
  cls: Stroke["cls"],
  runs: V3[][],
  opts: RoughOpts = {}
) {
  const d = runs
    .map((run) => rough(sample(run.map(project)), rnd, opts))
    .join(" ")
  strokes.push({ d, stage, cls })
}

const run = (stage: number, cls: Stroke["cls"], r: V3[], opts?: RoughOpts) =>
  group(stage, cls, [r], opts)

const edge = (stage: number, cls: Stroke["cls"], a: V3, b: V3, o?: RoughOpts) =>
  run(stage, cls, [a, b], o)

/** Closed loop through the given corners (do not repeat the first). */
const face = (
  stage: number,
  cls: Stroke["cls"],
  corners: V3[],
  o?: RoughOpts
) => group(stage, cls, [corners], { ...o, closed: true })

/** Close a run by repeating its first corner. */
const loop = (c: V3[]): V3[] => [...c, c[0]]

/** Clip an infinite param-space line to an axis-aligned box. */
function clipSlab(
  p: Pt,
  d: Pt,
  u: [number, number],
  v: [number, number]
): [number, number] | null {
  let t0 = -Infinity
  let t1 = Infinity
  const axes: [number, number, number, number][] = [
    [p[0], d[0], u[0], u[1]],
    [p[1], d[1], v[0], v[1]],
  ]
  for (const [px, dx, lo, hi] of axes) {
    if (Math.abs(dx) < 1e-9) {
      if (px < lo || px > hi) return null
    } else {
      let a = (lo - px) / dx
      let b = (hi - px) / dx
      if (a > b) [a, b] = [b, a]
      t0 = Math.max(t0, a)
      t1 = Math.min(t1, b)
    }
  }
  return t1 > t0 ? [t0, t1] : null
}

/**
 * Fill a rectangle of model space with hatching: parallel lines at `dir`,
 * spaced `spacing` apart, each one clipped to the rectangle — even, ruled
 * and machine-regular, as a draughtsman's section shade would be.
 */
function hatch(
  toWorld: (u: number, v: number) => V3,
  u: [number, number],
  v: [number, number],
  dir: [number, number],
  spacing: number
) {
  const len = Math.hypot(dir[0], dir[1])
  const d: Pt = [dir[0] / len, dir[1] / len]
  const n: Pt = [-d[1], d[0]]
  const center: Pt = [(u[0] + u[1]) / 2, (v[0] + v[1]) / 2]
  const reach = (Math.abs(u[1] - u[0]) + Math.abs(v[1] - v[0])) / 2
  const runs: V3[][] = []

  for (let k = -Math.ceil(reach / spacing); k <= Math.ceil(reach / spacing); k++) {
    const base: Pt = [
      center[0] + n[0] * k * spacing,
      center[1] + n[1] * k * spacing,
    ]
    const t = clipSlab(base, d, u, v)
    if (!t) continue
    const mid = (t[0] + t[1]) / 2
    const half = (t[1] - t[0]) / 2
    runs.push([
      toWorld(base[0] + d[0] * (mid - half), base[1] + d[1] * (mid - half)),
      toWorld(base[0] + d[0] * (mid + half), base[1] + d[1] * (mid + half)),
    ])
  }

  group(STAGE.shade, "hatch", runs, { amp: 0, over: 0 })
}

/* ------------------------------------------------------ the building, m */

const HW = 12 // body half-width
const DEPTH = 14 // body depth; facade plane sits at z = 0
const Y_BASE = 1.2 // top step / podium height
const Y_COL_TOP = 10.4 // architrave underside
const Y_EAVE = 12 // top of the entablature
const EAVE_HW = 12.5 // entablature overhang
const Z_WALL = 1.6 // recessed wall plane
const Z_COL = 0.8 // column axis plane
const R_COL = 0.75
const COLS = [-10, -6, -2, 2, 6, 10]

/* The crowning domes — a balustraded parapet over a colonnaded drum,
   a dome, a lantern and a finial, like the reference perspective. */
const BAL_Y0 = 12.15 // lower balustrade rail
const BAL_Y1 = 13 // upper balustrade rail
const BAL_Y2 = 13.2 // coping
const DRUM_R = 8.4 // drum radius, centred on plan centre
const CZ = 7 // plan centre in depth
const DRUM_Y0 = 13.5 // drum base course
const DRUM_Y1 = 16.8 // drum cornice
const DOME_RISE = 4.9 // dome rise above the spring
const LANT_R = 2.4 // lantern radius
const LANT_CZ = CZ - 4 // lantern centre — forward, over the dome crest
const LANT_Y0 = 21.6 // lantern base
const LANT_Y1 = 22.35 // lantern column tops
const LANT_CAP = 22.95 // lantern cap

/** Nested boxes: each step is wider and shallower than the one above. */
const STEPS = [
  { hw: 14, z: -3, back: 1.6 },
  { hw: 13.3, z: -2, back: 1.6 },
  { hw: 12.6, z: -1, back: 1.6 },
]

/** Horizontal band (arc) on a cylinder of radius r centred at (0, cz). */
function band(y: number, a0: number, a1: number, r = DRUM_R, cz = CZ): V3[] {
  const pts: V3[] = []
  const n = Math.max(10, Math.round(((a1 - a0) * r) / 5))
  for (let i = 0; i <= n; i++) {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180
    pts.push([r * Math.sin(a), y, cz - r * Math.cos(a)])
  }
  return pts
}

/** Meridian rib on the dome: fixed azimuth, rising from spring to apex. */
function domeRib(aDeg: number, r = DRUM_R, cz = CZ, ySpring = DRUM_Y1): V3[] {
  const a = (aDeg * Math.PI) / 180
  const pts: V3[] = []
  const n = 14
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * (Math.PI / 2)
    pts.push([
      r * Math.sin(t) * Math.sin(a),
      ySpring + DOME_RISE * Math.cos(t),
      cz - r * Math.sin(t) * Math.cos(a),
    ])
  }
  return pts
}

/** Latitude ring part-way up the dome. */
function domeProfile(
  a0 = -76,
  a1 = 76,
  r = DRUM_R * 0.86,
  cz = CZ - 1.2
): V3[] {
  const pts: V3[] = []
  const n = 20
  for (let i = 0; i <= n; i++) {
    const e = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180
    pts.push([
      r * Math.sin(e),
      DRUM_Y1 + DOME_RISE * Math.cos(e),
      cz - r * Math.cos(e) * 0.55,
    ])
  }
  return pts
}

/** Arched opening on a plane of constant z. */
function archFront(z: number, x0: number, x1: number, y0: number, ys: number) {
  const r = (x1 - x0) / 2
  const cx = (x0 + x1) / 2
  const pts: V3[] = [
    [x0, y0, z],
    [x0, ys, z],
  ]
  for (let i = 1; i < 7; i++) {
    const a = Math.PI - (i / 7) * Math.PI
    pts.push([cx + r * Math.cos(a), ys + r * Math.sin(a), z])
  }
  pts.push([x1, ys, z], [x1, y0, z])
  return pts
}

/** Arched opening on a plane of constant x. */
function archSide(x: number, z0: number, z1: number, y0: number, ys: number) {
  const r = (z1 - z0) / 2
  const cz = (z0 + z1) / 2
  const pts: V3[] = [
    [x, y0, z0],
    [x, ys, z0],
  ]
  for (let i = 1; i < 7; i++) {
    const a = Math.PI - (i / 7) * Math.PI
    pts.push([x, ys + r * Math.sin(a), cz + r * Math.cos(a)])
  }
  pts.push([x, ys, z1], [x, y0, z1])
  return pts
}

/* ------------------------------------------------------------- the drawing */

function drawLibrary() {
  /* 1 · massing — silhouette first: walls, the flank, and the full roof
     profile rising from the eave through drum and dome to the finial. */
  face(
    STAGE.mass,
    "w2",
    [
      [-HW, Y_BASE, Z_WALL],
      [-HW, Y_COL_TOP, Z_WALL],
      [HW, Y_COL_TOP, Z_WALL],
      [HW, Y_BASE, Z_WALL],
    ],
    { amp: 0, over: 0 }
  )
  face(
    STAGE.mass,
    "w1",
    [
      [HW, Y_BASE, 0],
      [HW, Y_COL_TOP, 0],
      [HW, Y_COL_TOP, DEPTH],
      [HW, Y_BASE, DEPTH],
    ],
    { amp: 0, over: 0 }
  )
  // Entablature, front band and flank return.
  face(
    STAGE.mass,
    "w1",
    [
      [-EAVE_HW, Y_COL_TOP, -0.5],
      [-EAVE_HW, Y_EAVE, -0.5],
      [EAVE_HW, Y_EAVE, -0.5],
      [EAVE_HW, Y_COL_TOP, -0.5],
    ],
    { amp: 0, over: 0 }
  )
  face(
    STAGE.mass,
    "w1",
    [
      [EAVE_HW, Y_COL_TOP, -0.5],
      [EAVE_HW, Y_EAVE, -0.5],
      [EAVE_HW, Y_EAVE, DEPTH + 0.5],
      [EAVE_HW, Y_COL_TOP, DEPTH + 0.5],
    ],
    { amp: 0, over: 0 }
  )
  // Coping course over the balustrade.
  edge(
    STAGE.mass,
    "w2",
    [-EAVE_HW + 0.6, BAL_Y2, -0.2],
    [EAVE_HW - 0.6, BAL_Y2, -0.2],
    { amp: 0, over: 0 }
  )
  // Drum silhouette: verticals at the tangencies, base and crown bands.
  edge(STAGE.mass, "w1", [-DRUM_R, DRUM_Y0 + 0.25, CZ - 0.6], [-DRUM_R, DRUM_Y1, CZ - 0.6], { amp: 0, over: 0 })
  edge(STAGE.mass, "w1", [DRUM_R, DRUM_Y0 + 0.25, CZ - 0.6], [DRUM_R, DRUM_Y1, CZ - 0.6], { amp: 0, over: 0 })
  group(STAGE.mass, "w2", [
    band(DRUM_Y0 + 0.25, -80, 80),
    band(DRUM_Y1, -78, 78),
  ])
  // Dome: front silhouette arc (shallow bulge), plus the rear shoulder
  // of the dome seen over the front mass.
  group(STAGE.mass, "w1", [domeProfile()], { amp: 0, over: 0 })
  group(STAGE.mass, "w2", [
    domeProfile(-72, 72, DRUM_R * 0.86, CZ + 3.6).map(
      ([x, y, z]) => [x, y + 0.35, z] as V3
    ),
  ])
  // Ribs on the dome over the front half.
  for (const aDeg of [-72, -54, -36, -18, 0, 18, 36, 54, 72]) {
    group(STAGE.mass, "w3", [domeRib(aDeg)])
  }

  /* 2 · steps — three nested boxes, tread by tread. */
  STEPS.forEach(({ hw, z, back }, i) => {
    const y0 = i * 0.4
    const y1 = y0 + 0.4
    const zNext = i < 2 ? STEPS[i + 1].z : Z_WALL
    group(
      STAGE.steps,
      "w2",
      [
        loop([
          [-hw, y0, z],
          [-hw, y1, z],
          [hw, y1, z],
          [hw, y0, z],
        ]),
        loop([
          [hw, y0, z],
          [hw, y1, z],
          [hw, y1, back],
          [hw, y0, back],
        ]),
        [
          [-hw, y1, zNext],
          [hw, y1, zNext],
        ],
        [
          [-hw, y1, z],
          [-hw, y1, zNext],
        ],
      ],
      { amp: 0, over: 0 }
    )
  })

  /* 3 · columns — the giant order carrying the tower, plus the drum
     colonnade and the lantern columns above. */
  COLS.forEach((cx) => {
    group(
      STAGE.columns,
      "w2",
      [
        [
          [cx - R_COL, 1.9, Z_COL],
          [cx - R_COL, 9.7, Z_COL],
        ],
        [
          [cx + R_COL, 1.9, Z_COL],
          [cx + R_COL, 9.7, Z_COL],
        ],
        loop([
          [cx - 0.95, Y_BASE, Z_COL],
          [cx - 0.95, 1.9, Z_COL],
          [cx + 0.95, 1.9, Z_COL],
          [cx + 0.95, Y_BASE, Z_COL],
        ]),
        loop([
          [cx - 0.95, 9.7, Z_COL],
          [cx - 0.95, Y_COL_TOP, Z_COL],
          [cx + 0.95, Y_COL_TOP, Z_COL],
          [cx + 0.95, 9.7, Z_COL],
        ]),
        [
          [cx - 0.34, 2.2, Z_COL],
          [cx - 0.34, 9.4, Z_COL],
        ],
        [
          [cx + 0.34, 2.2, Z_COL],
          [cx + 0.34, 9.4, Z_COL],
        ],
      ],
      { amp: 0, over: 0 }
    )
  })

  // Engaged pilasters closing each end of the portico.
  for (const px of [-11.55, 11.55]) {
    group(
      STAGE.columns,
      "w2",
      [
        [
          [px - 0.45, 1.9, Z_WALL - 0.05],
          [px - 0.45, 9.7, Z_WALL - 0.05],
        ],
        [
          [px + 0.45, 1.9, Z_WALL - 0.05],
          [px + 0.45, 9.7, Z_WALL - 0.05],
        ],
        loop([
          [px - 0.6, Y_BASE, Z_WALL - 0.05],
          [px - 0.6, 2.05, Z_WALL - 0.05],
          [px + 0.6, 2.05, Z_WALL - 0.05],
          [px + 0.6, Y_BASE, Z_WALL - 0.05],
        ]),
        loop([
          [px - 0.6, 9.55, Z_WALL - 0.05],
          [px - 0.6, Y_COL_TOP - 0.15, Z_WALL - 0.05],
          [px + 0.6, Y_COL_TOP - 0.15, Z_WALL - 0.05],
          [px + 0.6, 9.55, Z_WALL - 0.05],
        ]),
      ],
      { amp: 0, over: 0 }
    )
  }

  // Drum colonnade: paired columns around the front half.
  for (const aDeg of [-72, -48, -24, 0, 24, 48, 72]) {
    const a = (aDeg * Math.PI) / 180
    const cx = DRUM_R * Math.sin(a)
    const cz = CZ - DRUM_R * Math.cos(a)
    group(
      STAGE.columns,
      "w3",
      [
        [
          [cx - 0.42, DRUM_Y0 + 0.75, cz],
          [cx - 0.42, DRUM_Y1 - 0.55, cz],
        ],
        [
          [cx + 0.42, DRUM_Y0 + 0.75, cz],
          [cx + 0.42, DRUM_Y1 - 0.55, cz],
        ],
        [
          [cx - 0.6, DRUM_Y0 + 0.55, cz],
          [cx + 0.6, DRUM_Y0 + 0.55, cz],
        ],
        [
          [cx - 0.6, DRUM_Y1 - 0.35, cz],
          [cx + 0.6, DRUM_Y1 - 0.35, cz],
        ],
      ],
      { amp: 0, over: 0 }
    )
  }

  // Lantern colonnade above the dome.
  for (const aDeg of [-60, -30, 0, 30, 60]) {
    const a = (aDeg * Math.PI) / 180
    const cx = LANT_R * Math.sin(a)
    const cz = LANT_CZ - LANT_R * Math.cos(a)
    group(
      STAGE.columns,
      "w3",
      [
        [
          [cx - 0.26, LANT_Y0, cz],
          [cx - 0.26, LANT_Y1, cz],
        ],
        [
          [cx + 0.26, LANT_Y0, cz],
          [cx + 0.26, LANT_Y1, cz],
        ],
        [
          [cx - 0.38, LANT_Y0 - 0.12, cz],
          [cx + 0.38, LANT_Y0 - 0.12, cz],
        ],
      ],
      { amp: 0, over: 0 }
    )
  }

  /* 4 · the order — architrave, frieze, dentils, modillions, and the
     full balustrade under the drum. */
  // Architrave step lines.
  group(
    STAGE.order,
    "w2",
    [
      [
        [-EAVE_HW, 11.05, -0.5],
        [EAVE_HW, 11.05, -0.5],
      ],
      [
        [HW, 11.05, 0],
        [HW, 11.05, DEPTH],
      ],
      [
        [HW, 2, 0],
        [HW, 2, DEPTH],
      ],
    ],
    { amp: 0, over: 0 }
  )
  edge(STAGE.order, "w3", [-EAVE_HW, 11.2, -0.5], [EAVE_HW, 11.2, -0.5], {
    amp: 0,
    over: 0,
  })

  // Triglyph ticks across the frieze.
  const triglyphs: V3[][] = []
  for (let x = -11.4; x <= 11.4; x += 0.72) {
    triglyphs.push([
      [x, Y_COL_TOP + 0.15, -0.5],
      [x, Y_EAVE - 0.7, -0.5],
    ])
  }
  group(STAGE.order, "w3", triglyphs, { amp: 0, over: 0 })

  // Dentil row under the cornice, front and flank.
  const dentils: V3[][] = []
  for (let x = -12.3; x <= 12.3; x += 0.42) {
    dentils.push([
      [x, 11.55, -0.5],
      [x, 11.95, -0.5],
    ])
  }
  group(STAGE.order, "w3", dentils, { amp: 0, over: 0 })
  const flankDentils: V3[][] = []
  for (let z = 0.4; z <= 13.6; z += 0.42) {
    flankDentils.push([
      [EAVE_HW - 0.05, 11.55, z],
      [EAVE_HW - 0.05, 11.95, z],
    ])
  }
  group(STAGE.order, "w3", flankDentils, { amp: 0, over: 0 })

  // Balustrade: two rails, cope, and posts at close centres.
  group(
    STAGE.order,
    "w3",
    [
      [
        [-EAVE_HW + 0.6, BAL_Y0, -0.2],
        [EAVE_HW - 0.6, BAL_Y0, -0.2],
      ],
      [
        [-EAVE_HW + 0.6, BAL_Y1, -0.2],
        [EAVE_HW - 0.6, BAL_Y1, -0.2],
      ],
    ],
    { amp: 0, over: 0 }
  )
  const posts: V3[][] = []
  for (let x = -11.7; x <= 11.75; x += 0.66) {
    posts.push([
      [x, BAL_Y0, -0.2],
      [x, BAL_Y1, -0.2],
    ])
  }
  group(STAGE.order, "w3", posts, { amp: 0, over: 0 })

  // Drum base course and lower cornice, ruled as double bands.
  group(
    STAGE.order,
    "w3",
    [band(DRUM_Y0 + 0.45, -78, 78), band(DRUM_Y1 - 0.32, -78, 78)],
    { amp: 0, over: 0 }
  )
  group(STAGE.order, "w2", [band(DRUM_Y1 - 0.05, -78, 78)], { amp: 0, over: 0 })

  // Lantern: base ring, cap, and the finial — rod, ball and the spark
  // floating above, like a pin on a surveyor's map.
  group(
    STAGE.order,
    "w3",
    [
      band(LANT_Y0 - 0.18, -66, 66, LANT_R, LANT_CZ),
      band(LANT_CAP, -70, 70, LANT_R + 0.25, LANT_CZ),
      band(LANT_CAP + 0.14, -70, 70, LANT_R + 0.25, LANT_CZ),
    ],
    { amp: 0, over: 0 }
  )
  edge(
    STAGE.order,
    "w2",
    [0, LANT_CAP + 0.14, LANT_CZ - LANT_R * 0.75],
    [0, 24.55, LANT_CZ - LANT_R * 0.75],
    { amp: 0, over: 0 }
  )
  // Ball at the finial top, as a ruled octagon.
  {
    const ball: V3[] = []
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2
      ball.push([
        0.34 * Math.cos(a),
        24.78 + 0.34 * Math.sin(a),
        LANT_CZ - LANT_R * 0.75,
      ])
    }
    face(STAGE.order, "w2", ball, { amp: 0, over: 0 })
  }
  // The dot above the finial.
  {
    const spark: V3[] = []
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2
      spark.push([
        0.09 * Math.cos(a),
        25.35 + 0.09 * Math.sin(a),
        LANT_CZ - LANT_R * 0.75,
      ])
    }
    face(STAGE.order, "w3", spark, { amp: 0, over: 0 })
  }

  /* 5 · openings — the portal with archivolt, keystoned windows with
     pediments, flank windows, and corner quoins. */
  group(
    STAGE.open,
    "w3",
    [
      loop(archFront(1.15, -2.1, 2.1, Y_BASE, 5.9)),
      loop(archFront(Z_WALL, -1.7, 1.7, Y_BASE, 6)),
      [
        [0, Y_BASE, Z_WALL],
        [0, 7.7, Z_WALL],
      ],
      [
        [-1.7, 6, Z_WALL],
        [1.7, 6, Z_WALL],
      ],
      // Keystone over the portal arch.
      loop([
        [-0.62, 7.85, Z_WALL],
        [0.62, 7.85, Z_WALL],
        [0.38, 8.75, Z_WALL],
        [-0.38, 8.75, Z_WALL],
      ]),
    ],
    { amp: 0, over: 0 }
  )

  for (const cx of [-8, -4, 4, 8]) {
    group(
      STAGE.open,
      "w3",
      [
        loop(archFront(Z_WALL, cx - 1.15, cx + 1.15, 3.6, 6.6)),
        [
          [cx, 3.6, Z_WALL],
          [cx, 7.75, Z_WALL],
        ],
        [
          [cx - 1.15, 6.6, Z_WALL],
          [cx + 1.15, 6.6, Z_WALL],
        ],
        // Pediment over the window.
        [
          [cx - 1.65, 7.95, Z_WALL - 0.05],
          [cx, 8.7, Z_WALL - 0.05],
          [cx + 1.65, 7.95, Z_WALL - 0.05],
        ],
        [
          [cx - 1.65, 7.95, Z_WALL - 0.05],
          [cx + 1.65, 7.95, Z_WALL - 0.05],
        ],
        // Sill.
        [
          [cx - 1.35, 3.42, Z_WALL - 0.05],
          [cx + 1.35, 3.42, Z_WALL - 0.05],
        ],
      ],
      { amp: 0, over: 0 }
    )
  }

  for (const cz of [2.5, 5.5, 8.5, 11.5]) {
    group(
      STAGE.open,
      "w3",
      [
        loop(archSide(HW, cz - 1.1, cz + 1.1, 3.6, 6.6)),
        [
          [HW, 3.6, cz],
          [HW, 7.7, cz],
        ],
        [
          [HW, 6.6, cz - 1.1],
          [HW, 6.6, cz + 1.1],
        ],
      ],
      { amp: 0, over: 0 }
    )
  }

  // Corner quoins down the flank, alternating long and short.
  const quoins: V3[][] = []
  let i = 0
  for (let z = 0.55; z <= 10.4; z += 0.85) {
    const long = i % 2 === 0
    quoins.push([
      [HW + 0.02, long ? 0.15 : 0.75, z],
      [HW + 0.02, long ? 1.35 : 1.05, z],
    ])
    i++
  }
  group(STAGE.open, "w3", quoins, { amp: 0, over: 0 })

  /* 6 · shade — the recess behind the columns, the flank out of the
     light, and the ground the building rests on. Drawn first,
     inked last. */
  hatch(
    (x, y) => [x, y, Z_WALL],
    [-11.4, 11.4],
    [1.6, 10.1],
    [0.1, 1],
    0.72
  )
  hatch((y, z) => [HW, y, z], [1.5, 10.15], [0.5, DEPTH - 0.5], [0.5, 1], 0.34)
  hatch((x, z) => [x, 0, z], [-14, 14], [-6.2, -3], [1, 0.3], 0.52)
}

let cached: Stroke[] | null = null

/** Build (once) the strokes that make up the cover drawing. */
export function buildLibrarySketch(): Stroke[] {
  if (cached) return cached
  drawLibrary()
  cached = strokes
  return strokes
}
