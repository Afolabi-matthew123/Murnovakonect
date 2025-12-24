import { useLayoutTransmutation } from '@/hooks/useLayoutTransmutation';
import { useSessionLayout } from '@/hooks/useSessionLayout';

export function LivingShellController({ role, children }: any) {
  const { context, cognitiveState } = useLayoutTransmutation();
  const { layoutSnapshot } = useSessionLayout(role);

  return (
    <div
      className='living-shell'
      data-role={role}
      data-context={layoutSnapshot?.lastContext ?? context}
      data-cognitive={layoutSnapshot?.cognitiveBaseline ?? cognitiveState}
    >
      {children}
    </div>
  );
}
