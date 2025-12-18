import { useState, useCallback } from 'react';

export function useSpatialNavigation(items: string[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const previous = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const select = useCallback(() => items[activeIndex], [activeIndex, items]);

  return {
    activeIndex,
    activeItem: items[activeIndex],
    next,
    previous,
    select,
  };
}
