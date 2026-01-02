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
        title: 'Master React & Next.js',
        affirmation: 'I am a reference in Front-end and Design',
        completed: false,
      },
      {
        id: '2',
        title: 'Personal Website Finished',
        affirmation: 'My personal website attracts my ideal clients',
        completed: false,
      },
      {
        id: '3',
        title: 'My Company',
        affirmation: 'My company generates monthly revenue',
        completed: false,
      },
      {
        id: '4',
        title: 'Fluency in English',
        description: 'Proficiency certificate',
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
        title: 'Dream Abs',
        affirmation: 'My body is strong and defined',
        completed: false,
      },
      {
        id: '6',
        title: 'Mental Health',
        affirmation: 'I prioritize my mental health',
        completed: false,
      },
      {
        id: '7',
        title: 'Old Money Style',
        affirmation: 'I feel confident and elegant with my new style',
        completed: false,
      },
      {
        id: '8',
        title: 'Perfect Blonde Hair',
        description: 'The exact shade I want',
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
        title: 'Emergency Fund',
        affirmation: 'My emergency fund brings me peace',
        completed: false,
      },
      {
        id: '10',
        title: 'Growing Investments',
        affirmation: 'I am organized and my investments grow every month',
        completed: false,
      },
      {
        id: '11',
        title: 'My Car',
        description: 'Specific make and color',
        completed: false,
      },
      {
        id: '12',
        title: 'Live On My Own',
        affirmation: 'I have freedom in my own home',
        completed: false,
      },
      {
        id: '13',
        title: "Driver's License & US Visa",
        description: 'Freedom to go wherever I want',
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
        title: 'Rio de Janeiro',
        description: 'See the iconic landscapes',
        completed: false,
      },
      {
        id: '15',
        title: 'Santa Catarina',
        description: 'Paradise beaches',
        completed: false,
      },
      {
        id: '16',
        title: 'First International Trip',
        affirmation: 'My first international trip will be unforgettable',
        completed: false,
      },
      {
        id: '17',
        title: 'Family Time',
        affirmation: 'Quality time with my family is a priority',
        completed: false,
      },
    ],
  },
];
