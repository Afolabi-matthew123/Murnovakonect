export function NavOrb({ item, angle, distance }) {
  return (
    <div
      className='nav-orb'
      style={{
        transform: otate(deg) translate(px) rotate(-deg)
      }}
    >
      <span>{item.label}</span>
    </div>
  );
}
