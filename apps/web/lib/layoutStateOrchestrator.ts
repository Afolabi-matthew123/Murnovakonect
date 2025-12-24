type LayoutState = {
  context: string;
  cognitiveState: string;
  mode: 'normal' | 'focus' | 'emergency';
};

class LayoutStateOrchestrator {
  private state: LayoutState = {
    context: 'default',
    cognitiveState: 'neutral',
    mode: 'normal'
  };

  getState() {
    return this.state;
  }

  setContext(context: string) {
    this.state.context = context;
  }

  setCognitiveState(state: string) {
    this.state.cognitiveState = state;
  }

  focus() {
    this.state.mode = 'focus';
  }

  emergency() {
    this.state.mode = 'emergency';
  }

  normalize() {
    this.state.mode = 'normal';
  }
}

export const LayoutOrchestrator = new LayoutStateOrchestrator();
