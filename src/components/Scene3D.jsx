import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { director } from '../scrollState'

gsap.registerPlugin(ScrollTrigger)

const GOLD = '#d9b45a'
const EMBER = '#ff8c42'
const AMBER = '#f5a623'
const BODY = '#0e1834'

// Pose van het centrale object per hoofdstuk: het herorienteert zich
// bij elke sectie, zoals de fles op klimtwine.
const POSES = [
  { build: 0.15, tiltX: 0.06, yaw: 0.5, scale: 1.0, x: 0, y: -0.35, opacity: 1 }, // HET IDEE: delen zweven
  { build: 0.5, tiltX: 0.55, yaw: 2.1, scale: 0.85, x: 1.7, y: -0.1, opacity: 0.5 }, // HET ONTWERP: blauwdruk van boven
  { build: 1, tiltX: 0.02, yaw: 3.9, scale: 1.12, x: 0, y: -0.4, opacity: 1 }, // DE BOUW: centraal podium
  { build: 1, tiltX: -0.04, yaw: 5.4, scale: 0.78, x: 1.9, y: -0.1, opacity: 0.38 }, // DE AGENDA
  { build: 1, tiltX: 0.12, yaw: 6.9, scale: 0.8, x: -1.9, y: -0.1, opacity: 0.4 }, // SEO
  { build: 1, tiltX: 0, yaw: 8.4, scale: 0.95, x: 0, y: -0.25, opacity: 0.26 }, // LIVE: gedimd achter het glas
]

const PARTS = [
  { key: 'fundament', geo: 'box', args: [3.6, 0.25, 3.0], pos: [0, -1.05, 0], from: [0, -2.2, 0.5] },
  { key: 'muren', geo: 'box', args: [3.0, 1.7, 2.4], pos: [0, -0.08, 0], from: [-2.4, 1.0, -1.1] },
  { key: 'dak', geo: 'cone', args: [2.25, 1.35, 4], pos: [0, 1.45, 0], rot: [0, Math.PI / 4, 0], from: [0.8, 2.9, -0.6] },
  { key: 'schoorsteen', geo: 'box', args: [0.35, 0.9, 0.35], pos: [0.95, 1.85, -0.6], from: [2.4, 2.5, 0.6] },
  { key: 'deur', geo: 'box', args: [0.55, 0.95, 0.08], pos: [0, -0.48, 1.22], from: [-0.6, -1.3, 2.4] },
  { key: 'raamLinks', geo: 'box', args: [0.6, 0.55, 0.08], pos: [-0.95, 0.15, 1.22], from: [-2.5, -0.5, 1.7] },
  { key: 'raamRechts', geo: 'box', args: [0.6, 0.55, 0.08], pos: [0.95, 0.15, 1.22], from: [2.5, 0.9, 1.7] },
]

// Stagger per onderdeel binnen de totale bouwvoortgang.
const windowFor = (i, n) => [i / (n + 1.5), Math.min(1, (i + 2.5) / (n + 1.5))]
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

function Maquette() {
  const group = useRef()
  const refs = useRef([])
  const state = useRef({ build: POSES[0].build, yaw: POSES[0].yaw, tiltX: POSES[0].tiltX, scale: POSES[0].scale, x: POSES[0].x, y: POSES[0].y })

  const targets = useMemo(
    () => PARTS.map((p) => ({ pos: new THREE.Vector3(...p.pos), from: new THREE.Vector3(...p.from) })),
    []
  )

  useFrame((frame) => {
    const t = frame.clock.elapsedTime
    const pose = POSES[director.chapter] || POSES[0]
    const buildTarget =
      director.chapter < 2 ? pose.build : director.chapter === 2 ? 0.5 + 0.5 * director.bouwProgress : 1

    const s = state.current
    s.build += (buildTarget - s.build) * 0.045
    s.yaw += (pose.yaw + director.scroll * 0.8 - s.yaw) * 0.04
    s.tiltX += (pose.tiltX - s.tiltX) * 0.04
    s.scale += (pose.scale - s.scale) * 0.04
    s.x += (pose.x - s.x) * 0.04
    s.y += (pose.y - s.y) * 0.04

    if (group.current) {
      group.current.rotation.y = s.yaw + t * 0.04
      group.current.rotation.x = s.tiltX
      group.current.position.set(s.x, s.y + Math.sin(t * 0.55) * 0.05, 0)
      group.current.scale.setScalar(s.scale * 0.8)
    }

    PARTS.forEach((part, i) => {
      const mesh = refs.current[i]
      if (!mesh) return
      const [a, b] = windowFor(i, PARTS.length)
      const local = easeOutCubic(THREE.MathUtils.clamp((s.build - a) / (b - a), 0, 1))
      mesh.position.lerpVectors(targets[i].from, targets[i].pos, local)
      mesh.position.y += (1 - local) * Math.sin(t * 1.3 + i * 1.7) * 0.22
      mesh.rotation.z = (1 - local) * Math.sin(t * 0.9 + i) * 0.3
      mesh.material.opacity = 0.5 + local * 0.5
    })
  })

  return (
    <group ref={group}>
      {PARTS.map((part, i) => (
        <mesh key={part.key} ref={(el) => (refs.current[i] = el)} rotation={part.rot || [0, 0, 0]}>
          {part.geo === 'box' ? <boxGeometry args={part.args} /> : <coneGeometry args={part.args} />}
          {/* Glanzend nachtblauw met warme rimlight — premium maquette-gevoel */}
          <meshStandardMaterial
            color={BODY}
            emissive="#131226"
            emissiveIntensity={0.55}
            roughness={0.24}
            metalness={0.78}
            transparent
            flatShading
          />
          <Edges linewidth={1} threshold={12} color={GOLD} />
        </mesh>
      ))}

      {/* Sokkel: donker glanzend podium met gouden ring */}
      <group position={[0, -1.32, 0]}>
        <mesh>
          <cylinderGeometry args={[2.7, 2.85, 0.22, 64]} />
          <meshStandardMaterial color="#0b1330" roughness={0.18} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.7, 0.015, 12, 96]} />
          <meshBasicMaterial color={AMBER} />
        </mesh>
      </group>
    </group>
  )
}

function Moon() {
  return (
    <group position={[-7.5, 6.2, -12]}>
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial color="#f7e9c8" />
      </mesh>
      <mesh scale={1.7}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh scale={2.8}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial color={EMBER} transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

function CameraRig() {
  useFrame((frame) => {
    const cam = frame.camera
    cam.position.x += (frame.pointer.x * 0.4 - cam.position.x) * 0.04
    cam.position.y += (0.35 + frame.pointer.y * 0.25 - cam.position.y) * 0.04
    cam.lookAt(0, -0.1, 0)
  })
  return null
}

// Eén vast, centraal 3D-object voor de hele reis (zoals de klimt-fles):
// gepind in beeld, draait en herorienteert per hoofdstuk mee met de scroll.
export default function Scene3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const sections = gsap.utils.toArray('[data-chapter]')
    const triggers = sections.map((sec, i) =>
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (!self.isActive) return
          director.chapter = i
          const pose = POSES[i] || POSES[POSES.length - 1]
          gsap.to(containerRef.current, { opacity: pose.opacity, duration: 1.1, ease: 'power2.out' })
        },
      })
    )
    const total = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        director.scroll = self.progress
      },
    })
    return () => {
      triggers.forEach((t) => t.kill())
      total.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, 7.2], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Maanlicht als koele hoofdbron, oranje rimlight van achter-rechts */}
        <ambientLight intensity={0.26} color="#2e3a5e" />
        <directionalLight position={[-7, 7, 3]} intensity={1.55} color="#dce6ff" />
        <pointLight position={[3.4, 1.6, -3.2]} intensity={36} color={EMBER} />
        <pointLight position={[-3, 0.5, 3.5]} intensity={8} color={AMBER} />

        <Moon />
        <Maquette />

        <Sparkles count={70} scale={[15, 8, 10]} size={1.5} speed={0.18} opacity={0.4} color={GOLD} />

        <fog attach="fog" args={['#0a1128', 8.5, 24]} />
        <CameraRig />
      </Canvas>
    </div>
  )
}
