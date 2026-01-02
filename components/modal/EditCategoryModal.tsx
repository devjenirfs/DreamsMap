'use client';

import { useMemo, useState } from 'react';
import { Save, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import type { Category } from '@/lib/types';

interface EditCategoryModalProps {
  category: Category;
  onClose: () => void;
  onSave: (categoryId: string, updates: Pick<Category, 'title' | 'color' | 'gradient'>) => void;
}

const COLOR_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Purple', value: '#A855F7' },
  { label: 'Dark purple', value: '#581C87' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Dark pink', value: '#9D174D' },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Dark blue', value: '#1E3A8A' },
  { label: 'Cyan', value: '#0891B2' },
  { label: 'Green', value: '#10B981' },
  { label: 'Orange', value: '#F59E0B' },
  { label: 'Dark orange', value: '#EA580C' },
  { label: 'Red', value: '#EF4444' },
];

function extractGradientColors(gradient: string): { from?: string; to?: string } {
  // Expected: from-[#A855F7] to-[#4F46E5]
  const fromMatch = gradient.match(/from-\[#([0-9a-fA-F]{6})\]/);
  const toMatch = gradient.match(/to-\[#([0-9a-fA-F]{6})\]/);

  const from = fromMatch ? `#${fromMatch[1]}`.toUpperCase() : undefined;
  const to = toMatch ? `#${toMatch[1]}`.toUpperCase() : undefined;

  return { from, to };
}

export default function EditCategoryModal({ category, onClose, onSave }: EditCategoryModalProps) {
  const { from: defaultFrom, to: defaultTo } = extractGradientColors(category.gradient);

  const [title, setTitle] = useState(category.title);
  const [fromColor, setFromColor] = useState(defaultFrom ?? category.color);
  const [toColor, setToColor] = useState(defaultTo ?? '#4F46E5');

  const previewGradientClass = useMemo(() => {
    return `bg-gradient-to-r from-[${fromColor}] to-[${toColor}]`;
  }, [fromColor, toColor]);

  const canSubmit = title.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    onSave(category.id, {
      title: title.trim(),
      color: fromColor,
      gradient: `from-[${fromColor}] to-[${toColor}]`,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-[16px]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#00000080] backdrop-blur-[8px]"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#FFFFFF] rounded-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] max-w-[672px] w-full overflow-hidden"
        >
          <div className={`p-[24px] ${previewGradientClass}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <span className="text-[32px]">{category.emoji}</span>
                <div>
                  <h2 className="text-[24px] font-bold text-[#FFFFFF]">Edit Category</h2>
                  <p className="text-[#FFFFFFE6] text-[14px] mt-[4px]">Edit the title and colors</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#FFFFFF] hover:bg-[#FFFFFF33] rounded-full p-[8px] transition-colors"
                type="button"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-[24px] space-y-[16px]">
            <div>
              <label className="block text-[14px] font-semibold text-[#374151] mb-[8px]">Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-[16px] py-[12px] border-[2px] border-[#D1D5DB] rounded-[12px] focus:outline-none focus:border-[#A855F7] transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-[12px]">
              <div>
                <label className="block text-[14px] font-semibold text-[#374151] mb-[8px]">Color</label>

                <select
                  value={fromColor}
                  onChange={(e) => setFromColor(e.target.value)}
                  className="w-full px-[16px] py-[12px] border-[2px] border-[#D1D5DB] rounded-[12px] bg-[#FFFFFF] focus:outline-none focus:border-[#A855F7] transition-colors"
                >
                  {COLOR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#374151] mb-[8px]">Color 2</label>
                <select
                  value={toColor}
                  onChange={(e) => setToColor(e.target.value)}
                  className="w-full px-[16px] py-[12px] border-[2px] border-[#D1D5DB] rounded-[12px] bg-[#FFFFFF] focus:outline-none focus:border-[#A855F7] transition-colors"
                >
                  {COLOR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-[12px] pt-[8px]">
              <button
                type="button"
                onClick={onClose}
                className="px-[24px] py-[12px] bg-[#FFFFFF] border-[2px] border-[#D1D5DB] text-[#374151] rounded-[12px] font-semibold hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className={`px-[24px] py-[12px] text-[#FFFFFF] rounded-[12px] font-semibold transition-all flex items-center gap-[8px] ${
                  canSubmit
                    ? `${previewGradientClass} hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]`
                    : 'bg-[#9CA3AF] cursor-not-allowed'
                }`}
              >
                <Save size={18} />
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
