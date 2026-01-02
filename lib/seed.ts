import type { Category } from '@/lib/types';

export const initialCategories: Category[] = [
  {
    id: 'career',
    title: 'Carreira & Empreendedorismo',
    emoji: '💼',
    color: '#8B5CF6',
    gradient: 'from-[#A855F7] to-[#4F46E5]',
    dreams: [
      {
        id: '1',
        title: 'Dominar React & Next.js',
        affirmation: 'Sou uma referência em Front-end e Design',
        completed: false,
      },
      {
        id: '2',
        title: 'Site Pessoal Finalizado',
        affirmation: 'Meu site pessoal atrai meus clientes ideais',
        completed: false,
      },
      {
        id: '3',
        title: 'Minha Empresa',
        affirmation: 'Minha empresa fatura mensalmente',
        completed: false,
      },
      {
        id: '4',
        title: 'Fluência em Inglês',
        description: 'Certificado de proficiência',
        completed: false,
      },
    ],
  },
  {
    id: 'health',
    title: 'Saúde & Autoestima',
    emoji: '💪',
    color: '#10B981',
    gradient: 'from-[#10B981] to-[#0D9488]',
    dreams: [
      {
        id: '5',
        title: 'Abdômen dos Sonhos',
        affirmation: 'Meu corpo é forte e definido',
        completed: false,
      },
      {
        id: '6',
        title: 'Saúde Mental',
        affirmation: 'Eu cuido da minha saúde mental com prioridade',
        completed: false,
      },
      {
        id: '7',
        title: 'Estilo Old Money',
        affirmation: 'Sinto-me confiante e elegante com meu novo estilo',
        completed: false,
      },
      {
        id: '8',
        title: 'Cabelo Loiro Perfeito',
        description: 'Tom exato que desejo',
        completed: false,
      },
    ],
  },
  {
    id: 'finance',
    title: 'Finanças & Grandes Conquistas',
    emoji: '💰',
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#EA580C]',
    dreams: [
      {
        id: '9',
        title: 'Reserva de Emergência',
        affirmation: 'Minha reserva de emergência me traz paz',
        completed: false,
      },
      {
        id: '10',
        title: 'Investimentos Crescendo',
        affirmation: 'Sou organizada e meus investimentos crescem todo mês',
        completed: false,
      },
      {
        id: '11',
        title: 'Meu Carro',
        description: 'Marca e cor específica',
        completed: false,
      },
      {
        id: '12',
        title: 'Morar Sozinha',
        affirmation: 'Tenho liberdade na minha própria casa',
        completed: false,
      },
      {
        id: '13',
        title: 'CNH & Visto Americano',
        description: 'Liberdade de ir e vir',
        completed: false,
      },
    ],
  },
  {
    id: 'travel',
    title: 'Viagens & Família',
    emoji: '✈️',
    color: '#3B82F6',
    gradient: 'from-[#3B82F6] to-[#0891B2]',
    dreams: [
      {
        id: '14',
        title: 'Rio de Janeiro',
        description: 'Conhecer as paisagens icônicas',
        completed: false,
      },
      {
        id: '15',
        title: 'Santa Catarina',
        description: 'Praias paradisíacas',
        completed: false,
      },
      {
        id: '16',
        title: 'Primeira Viagem Internacional',
        affirmation: 'Minha primeira viagem internacional será inesquecível',
        completed: false,
      },
      {
        id: '17',
        title: 'Momentos em Família',
        affirmation: 'Momentos de lazer com minha família são prioridade',
        completed: false,
      },
    ],
  },
];
