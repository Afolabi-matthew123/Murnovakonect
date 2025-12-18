interface GraphHologramProps {
  title: string;
}

export function GraphHologram({ title }: GraphHologramProps) {
  return (
    <div className='graph-hologram holo-glass'>
      <h4>{title}</h4>
      <div className='graph-placeholder'>
        Holographic Graph Projection
      </div>
    </div>
  );
}
