import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { Category } from '@/lib/types';
import DreamCard from '../cards/DreamCard';

interface CategorySectionProps {
  category: Category;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onAddDream: () => void;
  onToggleDream: (categoryId: string, dreamId: string) => void;
  onDeleteDream: (categoryId: string, dreamId: string) => void;
  onDeleteCategory: () => void;
  onEditCategory: () => void;
  onEditDream: (categoryId: string, dreamId: string) => void;
}

export default function CategorySection({
  category,
  isCollapsed,
  onToggleCollapse,
  onAddDream,
  onToggleDream,
  onDeleteDream,
  onDeleteCategory,
  onEditCategory,
  onEditDream,
}: CategorySectionProps) {
  const completedCount = category.dreams.filter((d) => d.completed).length;
  const totalCount = category.dreams.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#FFFFFFCC] backdrop-blur-[20px] rounded-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-[#FFFFFF80] overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${category.gradient} p-[24px]`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <span className="text-[32px]">{category.emoji}</span>
            <div>
              <h2 className="text-[24px] font-bold text-[#FFFFFF]">{category.title}</h2>
              <p className="text-[#FFFFFFE6] text-[14px] mt-[4px]">
                {completedCount} of {totalCount} achieved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[12px]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleCollapse}
              className="bg-[#FFFFFF33] hover:bg-[#FFFFFF4D] backdrop-blur-[20px] text-[#FFFFFF] w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors border border-[#FFFFFF4D]"
              aria-label={isCollapsed ? 'Expand category' : 'Collapse category'}
              title={isCollapsed ? 'Expand category' : 'Collapse category'}
            >
              {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddDream}
              className="bg-[#FFFFFF33] hover:bg-[#FFFFFF4D] backdrop-blur-[20px] text-[#FFFFFF] px-[16px] py-[8px] rounded-full flex items-center gap-[8px] transition-colors border border-[#FFFFFF4D]"
            >
              <Plus size={20} />
              <span className="font-semibold">Add Dream</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEditCategory}
              className="bg-[#FFFFFF33] hover:bg-[#FFFFFF4D] backdrop-blur-[20px] text-[#FFFFFF] w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors border border-[#FFFFFF4D]"
              aria-label="Edit category"
              title="Edit category"
            >
              <Pencil size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (window.confirm('Remove this category? This will delete all dreams inside it.')) {
                  onDeleteCategory();
                }
              }}
              className="bg-[#FFFFFF33] hover:bg-[#FFFFFF4D] backdrop-blur-[20px] text-[#FFFFFF] w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors border border-[#FFFFFF4D]"
              aria-label="Remove category"
              title="Remove category"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-[16px] bg-[#FFFFFF33] rounded-full h-[12px] overflow-hidden backdrop-blur-[20px]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-[#FFFFFF] h-full rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      {/* Dreams Grid */}
      {!isCollapsed && (
        <div className="p-[24px]">
          {category.dreams.length === 0 ? (
            <div className="text-center py-[48px]">
              <p className="text-[#9CA3AF] text-[18px]">
                Add your first dream to this category ✨
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
              {category.dreams.map((dream, index) => (
                <DreamCard
                  key={dream.id}
                  dream={dream}
                  categoryColor={category.color}
                  index={index}
                  onToggle={() => onToggleDream(category.id, dream.id)}
                  onDelete={() => onDeleteDream(category.id, dream.id)}
                  onEdit={() => onEditDream(category.id, dream.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </motion.section>
  );
}
