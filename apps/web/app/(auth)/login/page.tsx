'use client';

import { useRouter } from 'next/navigation';
import QuantumAuthEngine from '@/components/auth/QuantumAuthEngine';
import { useAuthHandshake } from '@/hooks/useAuthHandshake';

export default function LoginPage() {
  const router = useRouter();
  const { emitHandshake } = useAuthHandshake();

  return (
    <QuantumAuthEngine
      context='routine'
      onAuthSuccess={(authResult) => {
        emitHandshake(authResult);
        router.push('/portal');
      }}
      onAuthFailure={() => alert('Authentication failed')}
    />
  );
}
