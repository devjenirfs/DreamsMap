'use client';

import { useRouter } from 'next/navigation';
import FavoritesPage from '@/components/Pages/FavoritesPage';

export default function Page() {
  const router = useRouter();
  return <FavoritesPage onBack={() => router.push('/')} />;
}
