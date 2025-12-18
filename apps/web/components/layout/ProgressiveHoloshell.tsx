import dynamic from 'next/dynamic';

const Holoshell = dynamic(() => import('./Holoshell'), { ssr: false });

export default function ProgressiveHoloshell(props) {
  if (typeof window === 'undefined') return null;

  const supportsWebGL = !!window.WebGLRenderingContext;

  if (!supportsWebGL) {
    return (
      <div className='fallback-shell'>
        <header>Murnova Konect</header>
        <main>{props.children}</main>
        <footer>Powered by Murnova Technology Limited</footer>
      </div>
    );
  }

  return <Holoshell {...props} />;
}
