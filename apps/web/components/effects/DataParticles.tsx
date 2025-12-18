interface DataParticlesProps {
  density?: 'low' | 'adaptive' | 'high';
}

export function DataParticles({ density = 'adaptive' }: DataParticlesProps) {
  return (
    <div className={data-particles density-} />
  );
}
