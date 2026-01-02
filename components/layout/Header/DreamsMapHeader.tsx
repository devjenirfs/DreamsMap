'use client';

import { useRouter } from 'next/navigation';

import {
  CircleUserRound,
  Heart,
  LogOut,
  Plus,
  Settings,
  Star,
  User,
  Wallpaper,
} from 'lucide-react';
import { motion } from 'motion/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DreamsMapHeaderProps {
  onWallpaperClick?: () => void;
  onAddCategoryClick?: () => void;
}

export function DreamsMapHeader({ onWallpaperClick, onAddCategoryClick }: DreamsMapHeaderProps) {
  const router = useRouter();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#FFFFFFCC] backdrop-blur-[12px] border-b border-[#E5E7EB] sticky top-0 z-50 shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
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
              <h1 className="text-[32px] font-bold bg-gradient-to-r from-[#A855F7] via-[#DB2777] to-[#2563EB] bg-clip-text text-transparent">
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
                className="flex items-center gap-[8px] bg-[#FFFFFF] border border-[#F3E8FF] text-[#111827] px-[16px] py-[8px] rounded-full shadow-sm"
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
                className="flex items-center gap-[8px] bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-[#FFFFFF] px-[16px] py-[8px] rounded-full shadow-[0_4px_15px_rgba(99,102,241,0.4)]"
              >
                <Wallpaper size={18} />
                <span className="font-semibold">View Wallpaper</span>
              </motion.button>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-[8px] bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-[#FFFFFF] px-[16px] py-[8px] rounded-full shadow-[0_4px_15px_rgba(219,39,119,0.4)]"
            >
              <Star size={18} fill="currentColor" />
              <span className="font-semibold">Your best is yet to come</span>
            </motion.div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center bg-gradient-to-br from-[#9333EA] to-[#DB2777] text-[#FFFFFF] w-10 h-10 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  aria-label="User menu"
                  title="User menu"
                >
                  <CircleUserRound size={22} />
                </motion.button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[220px]">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-[4px]">
                    <p className="text-[14px] font-medium leading-none">My Account</p>
                    <p className="text-[12px] leading-none text-[#6B7280]">sonhador@dreamsmap.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-[8px]">
                  <DropdownMenuItem onSelect={() => router.push('/profile')}>
                    <User size={16} className="mr-[8px]" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push('/favorites')}>
                    <Heart size={16} className="mr-[8px]" />
                    <span>My Favorite Dreams</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push('/settings')}>
                    <Settings size={16} className="mr-[8px]" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onSelect={() => router.push('/login')}>
                    <LogOut size={16} className="mr-[8px]" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default DreamsMapHeader;