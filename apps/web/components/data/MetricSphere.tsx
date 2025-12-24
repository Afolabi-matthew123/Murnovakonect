export function MetricSphere({ value, label }: any) {
  return (
    <div className='metric-sphere'>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
