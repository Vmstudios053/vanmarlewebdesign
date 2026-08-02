// Het VM-embleem als medaillon: cirkelmasker met inzoom op het beeldmerk,
// navy-vignet dat de lichte achtergrond van logo.png wegwerkt, gouden ring en glow.
export default function Emblem({ size = 40, alt = '', className = '' }) {
  return (
    <span
      className={`emblem ${className}`}
      style={{ width: size, height: size }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <img src="logo.png" alt="" loading="lazy" draggable="false" />
    </span>
  )
}
