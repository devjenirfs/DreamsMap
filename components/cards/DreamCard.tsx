import { Check, Pencil, Trash2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type { Dream } from '@/lib/types';

interface DreamCardProps {
  dream: Dream;
  categoryColor: string;
  index: number;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function DreamCard({
  dream,
  categoryColor,
  index,
  onToggle,
  onDelete,
  onEdit,
}: DreamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative"
    >
      <div
        className={`
          relative bg-gradient-to-br from-[#fff] to-[#f9fafb] rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]
          border-[8px] transition-all duration-300 overflow-hidden
          ${dream.completed ? 'border-[#4ADE80]' : 'border-[#E5E7EB]'}
          hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]
        `}
      >
        {/* Background decoration */}
        {dream.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] opacity-50"
          />
        )}

        {/* Content */}
        <div className="relative p-[20px]">
          {/* Top Actions */}
          <div className="flex items-start justify-between mb-[12px]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggle}
              className={`
                w-[28px] h-[28px] rounded-full border-[8px] flex items-center justify-center
                transition-all duration-300
                ${
                  dream.completed
                    ? 'bg-[#22C55E] border-[#22C55E]'
                    : 'bg-[#FFFFFF] border-[#D1D5DB] hover:border-[#4ADE80]'
                }
              `}
            >
              {dream.completed && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  <Check size={16} className="text-[#FFFFFF]" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>

            <div className="flex items-center gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onEdit}
                className="text-[#9CA3AF] hover:text-[#111827]"
                aria-label="Edit dream"
                title="Edit dream"
              >
                <Pencil size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onDelete}
                className="text-[#9CA3AF] hover:text-[#EF4444]"
                aria-label="Remove dream"
                title="Remove dream"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </div>

          {/* Image */}
          {dream.imageUrl && (
            <div className="mb-[12px] rounded-[12px] overflow-hidden">
              <img
                src={dream.imageUrl}
                alt={dream.title}
                className="w-full h-[128px] object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h3
            className={`font-bold text-[18px] mb-[8px] ${
              dream.completed ? 'line-through text-[#9CA3AF]' : 'text-[#1F2937]'
            }`}
          >
            {dream.title}
          </h3>

          {/* Description */}
          {dream.description && (
            <p className="text-[#1F2937] text-[#4B5563] mb-[12px]">{dream.description}</p>
          )}

          {/* Affirmation */}
          {dream.affirmation && (
            <div
              className="mt-[12px] pt-[12px] border-t border-[#E5E7EB]"
              style={{ borderColor: `${categoryColor}20` }}
            >
              <div className="flex items-start gap-[8px]">
                <Sparkles
                  size={14}
                  className="mt-[2px] flex-shrink-0"
                  style={{ color: categoryColor }}
                />
                <p
                  className="text-[14px] font-medium italic"
                  style={{ color: categoryColor }}
                >
                  "{dream.affirmation}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Completion overlay */}
        {dream.completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-[12px] right-[12px]"
          >
            <div className="bg-[#22C55E] text-[#FFFFFF] text-[12px] px-[8px] py-[4px] rounded-full font-bold shadow-lg">
              ✓ Achieved!
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
