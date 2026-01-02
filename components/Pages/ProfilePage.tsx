'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Calendar, MapPin, Edit, Save, X, Camera } from 'lucide-react';
import { Button, Input, Label, Textarea } from '../ui/primitives';

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dream Chaser',
    email: 'dreamer@dreamsmap.com',
    bio: 'Passionate about achieving my dreams and inspiring others to do the same. Every day is a new opportunity to grow.',
    location: 'San Francisco, CA',
    joinDate: 'January 2026',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
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
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-16 left-8"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl">
                    <User size={48} />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                  <Camera size={18} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Calendar size={16} />
                  Joined {profile.joinDate}
                </p>
              </div>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isEditing ? (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit size={18} className="mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-700">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="flex-1"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.email}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="flex-1"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.location}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="resize-none"
                  />
                ) : (
                  <p className="text-gray-700">{profile.bio}</p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    24
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Total Dreams</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                    12
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Achieved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    50%
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
