'use client';
import { useEffect, useMemo, useState } from 'react';
import DreamsMapHeader from '@/components/layout/Header/DreamsMapHeader';
import CategorySection from '@/components/sections/CategorySection';
import AddDreamModal from '@/components/modal/DreamModal';
import WallpaperView from '@/components/sections/WallpaperView';
import CategoryModal from '@/components/modal/CategoryModal';
import EditCategoryModal from '@/components/modal/EditCategoryModal';
import EditDreamModal from '@/components/modal/EditDreamModal';
import Footer from '@/components/layout/Footer/footer';

import type { Category, Dream } from '@/lib/types';
import { initialCategories } from '@/lib/seed';

const CATEGORIES_STORAGE_KEY = 'dreams.categories.v1';

export default function DreamsMap() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isHydrated, setIsHydrated] = useState(false);

  const [collapsedCategoryIds, setCollapsedCategoryIds] = useState<Set<string>>(() => new Set());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'wallpaper'>('dashboard');

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingDream, setEditingDream] = useState<{ categoryId: string; dreamId: string } | null>(null);

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

  const handleUpdateDream = (
    categoryId: string,
    dreamId: string,
    updates: Pick<Dream, 'title' | 'description' | 'affirmation' | 'imageUrl'>
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              dreams: cat.dreams.map((d) =>
                d.id === dreamId
                  ? {
                      ...d,
                      title: updates.title,
                      description: updates.description,
                      affirmation: updates.affirmation,
                      imageUrl: updates.imageUrl,
                    }
                  : d
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

  const handleUpdateCategory = (
    categoryId: string,
    updates: Pick<Category, 'title' | 'color' | 'gradient'>
  ) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              title: updates.title,
              color: updates.color,
              gradient: updates.gradient,
            }
          : c
      )
    );
  };

  const editingCategory = useMemo(
    () => categories.find((c) => c.id === editingCategoryId),
    [categories, editingCategoryId]
  );

  const editingDreamData = useMemo(() => {
    if (!editingDream) return null;
    const category = categories.find((c) => c.id === editingDream.categoryId);
    const dream = category?.dreams.find((d) => d.id === editingDream.dreamId);
    if (!category || !dream) return null;
    return { category, dream };
  }, [categories, editingDream]);

  const openModal = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleToggleCategoryCollapse = (categoryId: string) => {
    setCollapsedCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
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
              isCollapsed={collapsedCategoryIds.has(category.id)}
              onToggleCollapse={() => handleToggleCategoryCollapse(category.id)}
              onAddDream={() => openModal(category.id)}
              onToggleDream={handleToggleDream}
              onDeleteDream={handleDeleteDream}
              onDeleteCategory={() => handleDeleteCategory(category.id)}
              onEditCategory={() => setEditingCategoryId(category.id)}
              onEditDream={(categoryId, dreamId) => setEditingDream({ categoryId, dreamId })}
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

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategoryId(null)}
          onSave={handleUpdateCategory}
        />
      )}

      {editingDreamData && (
        <EditDreamModal
          category={editingDreamData.category}
          dream={editingDreamData.dream}
          onClose={() => setEditingDream(null)}
          onSave={handleUpdateDream}
        />
      )}

      <Footer />
    </div>
  );
}