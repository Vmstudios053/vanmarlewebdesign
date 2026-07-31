import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Sparkles, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { heroState } from '../scrollState'

const GOLD = '#d9b45a'
const BLUE = '#5b8dff'
const DARK = '#0b101c'

// Onderdelen van het huis: eindpositie, startoffset en het venster
// binnen de scrollvoortgang waarin het onderdeel op zijn plek valt.
const PARTS = [
  { key: 'fundament', geo: 'box', args: [3.6, 0.25, 3.0], pos: [0, -1.05, 0], from: [0, -2.4, 0.5], win: [0.0, 0.22] },
  { key: 'muren', geo: 'box', args: [3.0, 1.7, 2.4], pos: [0, -0.08, 0], from: [-2.6, 1.1, -1.2], win: [0.1, 0.38] },
  { key: 'dak', geo: 'cone', args: [2.25, 1.35, 4], pos: [0, 1.45, 0], rot: [0, Math.PI / 4, 0], from: [0.8, 3.1, -0.6], win: [0.28, 0.56] },
  { key: 'schoorsteen', geo: 'box', args: [0.35, 0.9, 0.35], pos: [0.95, 1.85, -0.6], from: [2.6, 2.7, 0.6], win: [0.44, 0.68] },
  { key: 'deur', geo: 'box', args: [0.55, 0.95, 0.08], pos: [0, -0.48, 1.22], from: [-0.6, -1.4, 2.6], win: [0.55, 0.78] },
  { key: 'raamLinks', geo: 'box', args: [0.6, 0.55, 0.08], pos: [-0.95, 0.15, 1.22], from: [-2.7, -0.5, 1.8], win: [0.62, 0.84] },
  { key: 'raamRechts', geo: 'box', args: [0.6, 0.55, 0.08], pos: [0.95, 0.15, 1.22], from: [2.7, 0.9, 1.8], win: [0.62, 0.84] },
]

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

function House() {
  const group = useRef()
  const refs = useRef([])

  const targets = useMemo(
    () =>
      PARTS.map((p) => ({
        pos: new THREE.Vector3(...p.pos),
        from: new THREE.Vector3(...p.from),
      })),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = heroState.progress

    if (group.current) {
      group.current.rotation.y = 0.35 + t * 0.08 + p * Math.PI * 0.5
      group.current.position.y = -0.25 + Math.sin(t * 0.6) * 0.06
    }

    PARTS.forEach((part, i) => {
      const mesh = refs.current[i]
      if (!mesh) return
      const [a, b] = part.win
      const local = easeOutCubic(THREE.MathUtils.clamp((p - a) / (b - a), 0, 1))
      mesh.position.lerpVectors(targets[i].from, targets[i].pos, local)
      const wobble = (1 - local) * Math.sin(t * 1.4 + i * 1.7) * 0.25
      mesh.position.y += wobble
      mesh.rotation.z = (1 - local) * Math.sin(t * 0.9 + i) * 0.35
      const s = 0.7 + local * 0.3
      mesh.scale.setScalar(s)
      mesh.material.opacity = 0.55 + local * 0.45
    })
  })

  return (
    <group ref={group} scale={0.82} position={[0, -0.25, 0]}>
      {PARTS.map((part, i) => (
        <mesh
          key={part.key}
          ref={(el) => (refs.current[i] = el)}
          rotation={part.rot || [0, 0, 0]}
        >
          {part.geo === 'box' ? (
            <boxGeometry args={part.args} />
          ) : (
            <coneGeometry args={part.args} />
          )}
          <meshStandardMaterial
            color={DARK}
            emissive="#141d33"
            emissiveIntensity={0.8}
            roughness={0.4}
            metalness={0.55}
            transparent
            flatShading
          />
          <Edges linewidth={1} threshold={12} color={GOLD} />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const p = heroState.progress
    const px = state.pointer.x
    const py = state.pointer.y
    const cam = state.camera
    cam.position.x += (px * 0.6 - cam.position.x) * 0.04
    cam.position.y += (0.6 + py * 0.4 - cam.position.y) * 0.04
    cam.position.z += (7.4 + p * 1.3 - cam.position.z) * 0.05
    cam.lookAt(0, 0.2, 0)
  })
  return null
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 7.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#fff6dd" />
      <pointLight position={[-5, 2, -3]} intensity={14} color={BLUE} />
      <pointLight position={[3, -1, 4]} intensity={10} color={GOLD} />

      <House />

      <Grid
        position={[0, -1.35, 0]}
        args={[40, 40]}
        cellSize={0.7}
        cellThickness={0.4}
        cellColor="#1a2236"
        sectionSize={3.5}
        sectionThickness={0.8}
        sectionColor="#243252"
        fadeDistance={26}
        fadeStrength={2.2}
        infiniteGrid
      />

      <Sparkles count={90} scale={[14, 8, 10]} size={1.6} speed={0.25} opacity={0.5} color={GOLD} />
      <Sparkles count={50} scale={[16, 9, 12]} size={1.2} speed={0.18} opacity={0.35} color={BLUE} />

      <fog attach="fog" args={['#04060b', 9, 26]} />
      <CameraRig />
    </Canvas>
  )
}
