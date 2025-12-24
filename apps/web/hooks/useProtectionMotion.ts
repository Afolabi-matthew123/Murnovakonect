import { useEffect } from 'react'

export function useProtectionMotion() {
  useEffect(() => {
    function handle(event: any) {
      const { allowed, confidence } = event.detail

      if (!allowed && confidence > 0.7) {
        document.documentElement.classList.add('pre-blocking')
      } else {
        document.documentElement.classList.remove('pre-blocking')
      }
    }

    window.addEventListener('neural-protection-motion', handle)
    return () => window.removeEventListener('neural-protection-motion', handle)
  }, [])
}
