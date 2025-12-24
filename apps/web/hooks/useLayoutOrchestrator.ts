import { LayoutOrchestrator } from '@/lib/layoutStateOrchestrator';

export function useLayoutOrchestrator() {
  return {
    getState: () => LayoutOrchestrator.getState(),
    setContext: (ctx: string) => LayoutOrchestrator.setContext(ctx),
    focusMode: () => LayoutOrchestrator.focus(),
    emergencyMode: () => LayoutOrchestrator.emergency(),
    normalize: () => LayoutOrchestrator.normalize()
  };
}
