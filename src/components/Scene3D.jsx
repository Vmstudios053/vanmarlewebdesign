import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Sparkles, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { heroState } from '../scrollState'

const GOLD = '#d9b45a'
const WARM = '#f0a95c'
const BLUE = '#3d5fb0'
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
      // Climax: het afgebouwde huis draait langzaam verder in beeld.
      group.current.rotation.y = 0.35 + t * 0.07 + p * Math.PI * 0.6
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
            emissive="#1a1626"
            emissiveIntensity={0.7}
            roughness={0.42}
            metalness={0.5}
            transparent
            flatShading
          />
          <Edges linewidth={1} threshold={12} color={GOLD} />
        </mesh>
      ))}
    </group>
  )
}

// De maan in een stille zomernacht: warm oplichtende bol plus één warme hoofdlichtbron.
function Moon() {
  return (
    <group position={[-7, 6.5, -12]}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#f7e9c8" />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color={WARM} transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh scale={2.6}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color={WARM} transparent opacity={0.07} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const p = heroState.progress
    const px = state.pointer.x
    const py = state.pointer.y
    const cam = state.camera
    // Reis door de scene: lage start in de mist, boog omhoog en uitzoomen naar de top.
    const targetX = px * 0.6 + Math.sin(p * Math.PI) * 1.3
    const targetY = 0.25 + p * 1.1 + py * 0.35
    const targetZ = 6.4 + p * 2.2
    cam.position.x += (targetX - cam.position.x) * 0.045
    cam.position.y += (targetY - cam.position.y) * 0.045
    cam.position.z += (targetZ - cam.position.z) * 0.05
    cam.lookAt(0, 0.2, 0)
  })
  return null
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.25, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Filmische belichting: één warme hoofdbron (de maan), diepblauwe tegenvulling. */}
      <ambientLight intensity={0.18} color="#2a3352" />
      <directionalLight position={[-7, 6.5, -4]} intensity={1.6} color="#f2c98a" />
      <pointLight position={[-5, 4, -2]} intensity={22} color={WARM} />
      <pointLight position={[4, -1, 4]} intensity={6} color={BLUE} />

      <Moon />
      <House />

      <Grid
        position={[0, -1.35, 0]}
        args={[40, 40]}
        cellSize={0.7}
        cellThickness={0.4}
        cellColor="#171f33"
        sectionSize={3.5}
        sectionThickness={0.8}
        sectionColor="#22304e"
        fadeDistance={26}
        fadeStrength={2.2}
        infiniteGrid
      />

      <Sparkles count={90} scale={[14, 8, 10]} size={1.7} speed={0.22} opacity={0.5} color={GOLD} />
      <Sparkles count={45} scale={[16, 9, 12]} size={1.1} speed={0.15} opacity={0.3} color="#7c9dea" />

      <fog attach="fog" args={['#04060b', 7.5, 23]} />
      <CameraRig />
    </Canvas>
  )
}
