import type { Category } from '@/lib/types';

export const initialCategories: Category[] = [
  {
    id: 'career',
    title: 'Career & Entrepreneurship',
    emoji: '💼',
    color: '#8B5CF6',
    gradient: 'from-[#A855F7] to-[#4F46E5]',
    dreams: [
      {
        id: '1',
        title: 'Learn a new skill',
        affirmation: 'I grow a little every day',
        completed: false,
      },
      {
        id: '2',
        title: 'Ship a personal project',
        affirmation: 'I finish what I start',
        completed: false,
      },
      {
        id: '3',
        title: 'Start a side hustle',
        affirmation: 'I create value and new opportunities',
        completed: false,
      },
      {
        id: '4',
        title: 'Complete a course or certification',
        description: 'Pick a topic and track your progress',
        completed: false,
      },
    ],
  },
  {
    id: 'health',
    title: 'Health & Self-Esteem',
    emoji: '💪',
    color: '#10B981',
    gradient: 'from-[#10B981] to-[#0D9488]',
    dreams: [
      {
        id: '5',
        title: 'Build a consistent workout routine',
        affirmation: 'My body gets stronger each week',
        completed: false,
      },
      {
        id: '6',
        title: 'Prioritize mental well-being',
        affirmation: 'I take care of my mind and emotions',
        completed: false,
      },
      {
        id: '7',
        title: 'Refresh personal style',
        affirmation: 'I feel confident in my own skin',
        completed: false,
      },
      {
        id: '8',
        title: 'Upgrade a self-care habit',
        description: 'Choose one habit to improve this month',
        completed: false,
      },
    ],
  },
  {
    id: 'finance',
    title: 'Finances & Big Wins',
    emoji: '💰',
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#EA580C]',
    dreams: [
      {
        id: '9',
        title: 'Build an emergency fund',
        affirmation: 'My finances support my peace of mind',
        completed: false,
      },
      {
        id: '10',
        title: 'Track spending for 30 days',
        affirmation: 'I am organized with my money',
        completed: false,
      },
      {
        id: '11',
        title: 'Save for a big purchase',
        description: 'Define the item and a realistic target',
        completed: false,
      },
      {
        id: '12',
        title: 'Improve living space',
        affirmation: 'My home supports my best life',
        completed: false,
      },
      {
        id: '13',
        title: 'Plan a major life milestone',
        description: 'Break it into small actionable steps',
        completed: false,
      },
    ],
  },
  {
    id: 'travel',
    title: 'Travel & Family',
    emoji: '✈️',
    color: '#3B82F6',
    gradient: 'from-[#3B82F6] to-[#0891B2]',
    dreams: [
      {
        id: '14',
        title: 'Visit a new city',
        description: 'Choose a destination and set a date',
        completed: false,
      },
      {
        id: '15',
        title: 'Take a weekend trip',
        description: 'Plan a simple itinerary and budget',
        completed: false,
      },
      {
        id: '16',
        title: 'Plan a bigger trip',
        affirmation: 'I create memorable experiences',
        completed: false,
      },
      {
        id: '17',
        title: 'Schedule quality time',
        affirmation: 'I invest in the people I love',
        completed: false,
      },
    ],
  },
];
