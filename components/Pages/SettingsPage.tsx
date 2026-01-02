'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Moon, 
  Sun, 
  Trash2,
  Shield,
  Mail
} from 'lucide-react';
import { Button, Label, Switch, Separator } from '../ui/primitives';

interface SettingsPageProps {
  onBack: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      weekly: true,
      achievements: true,
    },
    appearance: {
      darkMode: false,
      compactView: false,
    },
    privacy: {
      publicProfile: false,
      showAchievements: true,
    },
  });

  const updateSetting = (category: keyof typeof settings, key: string, value: boolean) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6"
        >
          ← Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-600 mb-8">Manage your account preferences and settings</p>

          <div className="space-y-6">
            {/* Notifications Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Bell size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                  <p className="text-sm text-gray-500">Manage how you receive updates</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-400" />
                    <div>
                      <Label htmlFor="email-notif">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-gray-400" />
                    <div>
                      <Label htmlFor="push-notif">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Get instant updates</p>
                    </div>
                  </div>
                  <Switch
                    id="push-notif"
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-summary">Weekly Summary</Label>
                    <p className="text-sm text-gray-500">Get a weekly progress report</p>
                  </div>
                  <Switch
                    id="weekly-summary"
                    checked={settings.notifications.weekly}
                    onCheckedChange={(checked) => updateSetting('notifications', 'weekly', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="achievement-notif">Achievement Alerts</Label>
                    <p className="text-sm text-gray-500">Celebrate your wins</p>
                  </div>
                  <Switch
                    id="achievement-notif"
                    checked={settings.notifications.achievements}
                    onCheckedChange={(checked) => updateSetting('notifications', 'achievements', checked)}
                  />
                </div>
              </div>
            </motion.div>

            {/* Appearance Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg">
                  <Palette size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Appearance</h2>
                  <p className="text-sm text-gray-500">Customize your experience</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon size={18} className="text-gray-400" />
                    <div>
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-gray-500">Switch to dark theme</p>
                    </div>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={settings.appearance.darkMode}
                    onCheckedChange={(checked) => updateSetting('appearance', 'darkMode', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-view">Compact View</Label>
                    <p className="text-sm text-gray-500">Show more content at once</p>
                  </div>
                  <Switch
                    id="compact-view"
                    checked={settings.appearance.compactView}
                    onCheckedChange={(checked) => updateSetting('appearance', 'compactView', checked)}
                  />
                </div>
              </div>
            </motion.div>

            {/* Privacy & Security Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Privacy & Security</h2>
                  <p className="text-sm text-gray-500">Control your data and visibility</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-gray-400" />
                    <div>
                      <Label htmlFor="public-profile">Public Profile</Label>
                      <p className="text-sm text-gray-500">Make your profile visible to others</p>
                    </div>
                  </div>
                  <Switch
                    id="public-profile"
                    checked={settings.privacy.publicProfile}
                    onCheckedChange={(checked) => updateSetting('privacy', 'publicProfile', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-achievements">Show Achievements</Label>
                    <p className="text-sm text-gray-500">Display your completed dreams</p>
                  </div>
                  <Switch
                    id="show-achievements"
                    checked={settings.privacy.showAchievements}
                    onCheckedChange={(checked) => updateSetting('privacy', 'showAchievements', checked)}
                  />
                </div>

                <Separator />

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Lock size={18} className="mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-red-50 backdrop-blur-lg rounded-2xl border border-red-200 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Trash2 size={24} className="text-red-600" />
                <div>
                  <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
                  <p className="text-sm text-red-600">Irreversible actions</p>
                </div>
              </div>

              <Button variant="destructive" className="w-full">
                <Trash2 size={18} className="mr-2" />
                Delete Account
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
