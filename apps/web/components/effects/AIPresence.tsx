interface AIPresenceProps {
  mode?: 'ambient' | 'assistive' | 'active';
}

export function AIPresence({ mode = 'ambient' }: AIPresenceProps) {
  return (
    <div className={i-presence ai-} aria-hidden>
      <span className='ai-pulse' />
    </div>
  );
}
