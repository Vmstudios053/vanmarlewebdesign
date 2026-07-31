// Klimt-stijl 'ghost text': heldere serif-kop met een vervaagde,
// uitvergrote echo erachter. De echo erft de font-grootte van de kop.
export default function GhostTitle({ echo, children, className = '' }) {
  return (
    <h2 className={`display relative ${className}`}>
      <span className="ghost-echo" aria-hidden>{echo}</span>
      {children}
    </h2>
  )
}
