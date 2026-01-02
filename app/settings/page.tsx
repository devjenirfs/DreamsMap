'use client';

import { useRouter } from 'next/navigation';
import SettingsPage from '@/components/Pages/SettingsPage';

export default function Page() {
  const router = useRouter();
  return <SettingsPage onBack={() => router.push('/')} />;
}
