'use client';

import { useRouter } from 'next/navigation';
import LoginPage from '@/components/Pages/LoginPage';

export default function Page() {
  const router = useRouter();
  return <LoginPage onLogin={() => router.push('/')} />;
}
