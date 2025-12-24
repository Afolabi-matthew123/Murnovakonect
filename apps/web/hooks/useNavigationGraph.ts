import { useRef } from 'react';

type Edge = { to: string; weight: number };

export function useNavigationGraph(userId: string, role: string) {
  const graph = useRef<Map<string, Edge[]>>(new Map());

  function recordTransition(route: string) {
    const prev = sessionStorage.getItem('lastRoute');
    if (!prev) {
      sessionStorage.setItem('lastRoute', route);
      return;
    }

    const edges = graph.current.get(prev) || [];
    const edge = edges.find(e => e.to === route);

    if (edge) edge.weight += 1;
    else edges.push({ to: route, weight: 1 });

    graph.current.set(prev, edges);
    sessionStorage.setItem('lastRoute', route);
  }

  function predictNext(route: string) {
    const edges = graph.current.get(route) || [];
    return [...edges].sort((a, b) => b.weight - a.weight);
  }

  return { recordTransition, predictNext };
}
