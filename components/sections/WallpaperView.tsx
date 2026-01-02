import { ArrowLeft, Download, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type { Category } from '@/lib/types';

interface WallpaperViewProps {
  categories: Category[];
  onBack: () => void;
  phrases?: {
    headline?: string;
    subheadline?: string;
    badge?: string;
  };
}

export default function WallpaperView({ categories, onBack, phrases }: WallpaperViewProps) {
  const topLeftCategory = categories[0];
  const topRightCategory = categories[1];
  const bottomLeftCategory = categories[2];
  const bottomRightCategory = categories[3];

  const headline = phrases?.headline ?? 'I am the architect\nof my destiny';
  const subheadline = phrases?.subheadline ?? 'All my dreams come true';
  const badge = phrases?.badge ?? '2026 - My Year';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#581C87] via-[#9D174D] to-[#1E3A8A] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#A855F71A] rounded-full blur-[32px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#ec48991a] rounded-full blur-[32px]"
        />
      </div>

      {/* Header Controls */}
      <div className="absolute top-[16px] left-[16px] right-[16px] sm:top-[24px] sm:left-[24px] sm:right-[24px] z-50 flex items-center justify-between gap-[12px]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="w-fit flex items-center gap-[8px] bg-[#FFFFFF1A] backdrop-blur-[20px] text-[#FFFFFF] px-[12px] sm:px-[16px] py-[8px] rounded-full border border-[#FFFFFF33] hover:bg-[#FFFFFF33] transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="font-semibold">Back</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Take screenshot functionality would go here
            alert('Tip: Use your system screenshot shortcut to capture your screen.');
          }}
          aria-label="Save as Wallpaper"
          className="w-fit flex items-center gap-[8px] bg-[#FFFFFF1A] backdrop-blur-[20px] text-[#FFFFFF] px-[12px] sm:px-[16px] py-[8px] rounded-full border border-[#FFFFFF33] hover:bg-[#FFFFFF33] transition-colors"
        >
          <Download size={18} />
          <span className="hidden sm:inline font-semibold">Save as Wallpaper</span>
        </motion.button>
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-3 gap-[16px] sm:gap-[24px] p-[16px] sm:p-[32px] pt-[96px] sm:pt-[32px]">
        {/* Top Left - Career */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:col-span-1 sm:row-span-1"
        >
          <QuadrantCard category={topLeftCategory} />
        </motion.div>

        {/* Top Center - Spacer */}
        <div className="hidden sm:block sm:col-span-1 sm:row-span-1" />

        {/* Top Right - Finance */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:col-span-1 sm:row-span-1"
        >
          <QuadrantCard category={topRightCategory} />
        </motion.div>

        {/* Middle Left - Spacer */}
        <div className="hidden sm:block sm:col-span-1 sm:row-span-1" />

        {/* Center - Hero Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center sm:col-span-1 sm:row-span-1"
        >
          <div className="text-center space-y-[16px] sm:space-y-[24px]">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="text-[48px] sm:text-[64px] mb-[8px] sm:mb-[16px]"
            >
              ✨
            </motion.div>
            <h1 className="text-[28px] sm:text-[40px] font-bold text-[#FFFFFF] mb-[8px] sm:mb-[16px] leading-tight whitespace-pre-line">
              {headline}
            </h1>
            <p className="text-[16px] sm:text-[24px] text-[#FFFFFFE6] font-medium">{subheadline}</p>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="inline-block"
            >
              <div className="flex items-center gap-[8px] bg-[#FFFFFF33] backdrop-blur-[20px] px-[16px] sm:px-[24px] py-[10px] sm:py-[12px] rounded-full border border-[#FFFFFF4D] mt-[12px] sm:mt-[16px]">
                <Sparkles size={20} className="text-[#FDE68A]" />
                <span className="text-[#FFFFFF] font-bold">{badge}</span>
                <Sparkles size={20} className="text-[#FDE68A]" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Middle Right - Spacer */}
        <div className="hidden sm:block sm:col-span-1 sm:row-span-1" />

        {/* Bottom Left - Health & Lifestyle */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:col-span-1 sm:row-span-1"
        >
          <QuadrantCard category={bottomLeftCategory} />
        </motion.div>

        {/* Bottom Center - Spacer */}
        <div className="hidden sm:block sm:col-span-1 sm:row-span-1" />

        {/* Bottom Right - Travel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:col-span-1 sm:row-span-1"
        >
          <QuadrantCard category={bottomRightCategory} />
        </motion.div>
      </div>
    </div>
  );
}

interface QuadrantCardProps {
  category?: Category;
}

function QuadrantCard({ category }: QuadrantCardProps) {
  if (!category) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-[#FFFFFF33] backdrop-blur-[20px] rounded-3xl p-[16px] sm:p-[24px] border border-[#FFFFFF4D] shadow-2xl h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-[12px] mb-[16px]">
        <span className="text-[24px] sm:text-[32px]">{category.emoji}</span>
        <h2 className="text-[16px] sm:text-[20px] font-bold text-[#FFFFFF]">{category.title}</h2>
      </div>

      {/* Dreams List */}
      <div className="space-y-3 flex-1">
        {category.dreams.slice(0, 4).map((dream, index) => (
          <motion.div
            key={dream.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="group"
          >
            {dream.affirmation ? (
              <div className="bg-[#FFFFFF33] backdrop-blur-[20px] rounded-xl p-[12px] border border-[#FFFFFF4D]">
                <div className="flex items-start gap-[8px]">
                  <Sparkles size={14} className="text-[#FDE68A] mt-1 flex-shrink-0" />
                  <p className="text-[#FFFFFFE6] text-[12px] sm:text-[14px] italic leading-relaxed">
                    &ldquo;{dream.affirmation}&rdquo;
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#FFFFFF33] backdrop-blur-[20px] rounded-xl p-[12px] border border-[#FFFFFF4D]">
                <p className="text-[#FFFFFF] font-semibold text-[12px] sm:text-[14px]">{dream.title}</p>
                {dream.description && (
                  <p className="text-[#FFFFFFB3] text-[12px] mt-[4px]">{dream.description}</p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-[16px] pt-[16px] border-t border-[#FFFFFF33]">
        <p className="text-[#FFFFFF99] text-[12px] text-center">
          {category.dreams.filter((d) => d.completed).length} of {category.dreams.length} achieved
        </p>
      </div>
    </motion.div>
  );
}
