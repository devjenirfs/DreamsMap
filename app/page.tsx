'use client';
import { useEffect, useMemo, useState } from 'react';
import DreamsMapHeader from '@/components/Header/DreamsMapHeader';
import CategorySection from '@/components/sections/CategorySection';
import AddDreamModal from '@/components/modal/DreamModal';
import WallpaperView from '@/components/sections/WallpaperView';
import CategoryModal from '@/components/modal/CategoryModal';

import type { Category, Dream } from '@/lib/types';
import { initialCategories } from '@/lib/seed';

const CATEGORIES_STORAGE_KEY = 'dreams.categories.v1';

export default function DreamsMap() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isHydrated, setIsHydrated] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'wallpaper'>('dashboard');

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        setCategories(parsed as Category[]);
      }
    } catch {
      // ignore invalid persisted data
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch {
      // ignore quota / storage failures
    }
  }, [categories, isHydrated]);

  const handleAddDream = (categoryId: string, dream: Dream) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, dreams: [...cat.dreams, dream] }
          : cat
      )
    );
  };

  const handleToggleDream = (categoryId: string, dreamId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              dreams: cat.dreams.map((dream) =>
                dream.id === dreamId
                  ? { ...dream, completed: !dream.completed }
                  : dream
              ),
            }
          : cat
      )
    );
  };

  const handleDeleteDream = (categoryId: string, dreamId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              dreams: cat.dreams.filter((dream) => dream.id !== dreamId),
            }
          : cat
      )
    );
  };

  const handleCreateCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  const openModal = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  if (viewMode === 'wallpaper') {
    return <WallpaperView categories={categories} onBack={() => setViewMode('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEE2E2] via-[#FDF2F8] to-[#EFF6FF]">
      <DreamsMapHeader
        onWallpaperClick={() => setViewMode('wallpaper')}
        onAddCategoryClick={() => setIsCategoryModalOpen(true)}
      />
      
      <main className="container mx-auto px-[16px] py-[32px] max-w-[1600px]">
        <div className="space-y-[32px]">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onAddDream={() => openModal(category.id)}
              onToggleDream={handleToggleDream}
              onDeleteDream={handleDeleteDream}
              onDeleteCategory={() => handleDeleteCategory(category.id)}
            />
          ))}
        </div>
      </main>

      {isModalOpen && selectedCategory && (
        <AddDreamModal
          category={categories.find((cat) => cat.id === selectedCategory)!}
          onClose={closeModal}
          onAdd={handleAddDream}
        />
      )}

      {isCategoryModalOpen && (
        <CategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          onCreate={handleCreateCategory}
        />
      )}
    </div>
  );
}