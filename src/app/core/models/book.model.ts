export type BookStatus = 'lendo' | 'lido' | 'pausado' | 'quero-ler';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  totalPages: number;
  currentPage: number;
  status: BookStatus;
  rating: number;
  startedAt: string | null;
  note: string;
  updatedAt: string;
}

export interface DailyQuote {
  text: string;
  author: string;
}

export const STATUS_LABEL: Record<BookStatus, string> = {
  lendo: 'Lendo',
  lido: 'Lido',
  pausado: 'Pausado',
  'quero-ler': 'Quero ler',
};
