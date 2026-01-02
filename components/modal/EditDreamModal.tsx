'use client';

import { useState } from 'react';
import { X, Image as ImageIcon, Sparkles, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import type { Category, Dream } from '@/lib/types';

interface EditDreamModalProps {
  category: Category;
  dream: Dream;
  onClose: () => void;
  onSave: (
    categoryId: string,
    dreamId: string,
    updates: Pick<Dream, 'title' | 'description' | 'affirmation' | 'imageUrl'>
  ) => void;
}

export default function EditDreamModal({ category, dream, onClose, onSave }: EditDreamModalProps) {
  const [title, setTitle] = useState(dream.title);
  const [description, setDescription] = useState(dream.description ?? '');
  const [affirmation, setAffirmation] = useState(dream.affirmation ?? '');
  const [imageUrl, setImageUrl] = useState(dream.imageUrl ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSave(category.id, dream.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      affirmation: affirmation.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
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
          className="relative bg-[#FFFFFF] rounded-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] max-w-[672px] w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${category.gradient} p-[24px]`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <span className="text-[32px]">{category.emoji}</span>
                <div>
                  <h2 className="text-[24px] font-bold text-[#FFFFFF]">Edit Dream</h2>
                  <p className="text-[#FFFFFFE6] text-[14px] mt-[4px]">{category.title}</p>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-[24px] space-y-[20px] overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Title */}
            <div>
              <label className="block text-[14px] font-semibold text-[#374151] mb-[8px]">Dream title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-[16px] py-[12px] border-[2px] border-[#D1D5DB] rounded-[12px] focus:outline-none focus:border-[#A855F7] transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[14px] font-semibold text-[#374151] mb-[8px]">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-[16px] py-[12px] border-[2px] border-[#D1D5DB] rounded-[12px] focus:outline-none focus:border-[#A855F7] transition-colors resize-none"
              />
            </div>

            {/* Affirmation */}
            <div>
              <label className="flex items-center gap-[8px] text-[14px] font-semibold text-[#374151] mb-[8px]">
                <Sparkles size={16} style={{ color: category.color }} />
                Affirmation (optional)
              </label>
              <input
                type="text"
                value={affirmation}
                onChange={(e) => setAffirmation(e.target.value)}
                className="w-full px-[16px] py-[12px] border-[2px] border-[#D1D5DB] rounded-[12px] focus:outline-none focus:border-[#A855F7] transition-colors"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center gap-[8px] text-[14px] font-semibold text-[#374151] mb-[8px]">
                <ImageIcon size={16} style={{ color: category.color }} />
                Image URL (optional)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-[16px] py-[12px] border-[2px] border-[#D1D5DB] rounded-[12px] focus:outline-none focus:border-[#A855F7] transition-colors"
              />
              {imageUrl && (
                <div className="mt-[12px] rounded-[12px] overflow-hidden border-[2px] border-[#D1D5DB]">
                  <img src={imageUrl} alt="Preview" className="w-full h-[192px] object-cover" />
                </div>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="bg-[#F9FAFB] px-[24px] py-[16px] flex items-center justify-end gap-[12px] border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-[24px] py-[12px] bg-[#FFFFFF] border-[2px] border-[#D1D5DB] text-[#374151] rounded-[12px] font-semibold hover:bg-[#F3F4F6] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-[24px] py-[12px] bg-gradient-to-r ${category.gradient} text-[#FFFFFF] rounded-[12px] font-semibold hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all flex items-center gap-[8px]`}
            >
              <Save size={18} />
              Save
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
