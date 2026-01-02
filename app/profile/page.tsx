'use client';

import { useRouter } from 'next/navigation';
import ProfilePage from '@/components/Pages/ProfilePage';

export default function Page() {
  const router = useRouter();
  return <ProfilePage onBack={() => router.push('/')} />;
}
