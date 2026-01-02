import { Plus, Sparkles, Star, Wallpaper } from 'lucide-react';
import { motion } from 'motion/react';

interface DreamsMapHeaderProps {
  onWallpaperClick?: () => void;
  onAddCategoryClick?: () => void;
}

export default function DreamsMapHeader({ onWallpaperClick, onAddCategoryClick }: DreamsMapHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#FFFFFFCC] backdrop-blur-[12px] border-b border-[#E9D5FF] sticky top-0 z-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div className="container mx-auto px-[16px] py-[24px] max-w-[1600px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="text-[32px]"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-[#C084FC] blur-[24px] -z-10"
              />
            </div>
            <div>
              <h1 className="text-[32px] font-bold bg-gradient-to-r from-[#9333EA] via-[#DB2777] to-[#2563EB] bg-clip-text text-transparent">
                My Dream Map
              </h1>
              <p className="text-[#4B5563] text-[14px] mt-[4px]">
                Visualize, affirm, and achieve your goals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[12px]">
            {onAddCategoryClick && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAddCategoryClick}
                className="flex items-center gap-[8px] bg-[#FFFFFF] border border-[#E5E7EB] text-[#111827] px-[16px] py-[8px] rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
              >
                <Plus size={18} />
                <span className="font-semibold">Add Category</span>
              </motion.button>
            )}
            {onWallpaperClick && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onWallpaperClick}
                className="flex items-center gap-[8px] bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-[#fff] px-[16px] py-[8px] rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
              >
                <Wallpaper size={18} />
                <span className="font-semibold">View Wallpaper</span>
              </motion.button>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-[8px] bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-[#fff] px-[16px] py-[8px] rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
            >
              <Star size={18} fill="currentColor" />
              <span className="font-semibold">Your best is yet to come</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}