import React from 'react';

interface FloatingWidgetProps {
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export function FloatingWidget({ children, position = 'right' }: FloatingWidgetProps) {
  return (
    <div className={loating-widget float-}>
      {children}
    </div>
  );
}
