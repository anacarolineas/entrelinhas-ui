import { computed, Injectable, signal } from '@angular/core';
import { DAILY_QUOTES } from '../data/quotes';
import { MOCK_BOOKS } from '../data/mock-books';
import { Book, BookStatus, DailyQuote } from '../models/book.model';

export interface NewBookInput {
  title: string;
  author: string;
  genre: string;
  totalPages: number;
  status: BookStatus;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly booksState = signal<Book[]>(MOCK_BOOKS);
  private readonly selectedIdState = signal<string>(MOCK_BOOKS[0].id);
  readonly search = signal('');
  readonly statusFilter = signal<BookStatus | 'todos'>('todos');
  readonly quoteIndex = signal(0);

  readonly books = this.booksState.asReadonly();
  readonly selectedId = this.selectedIdState.asReadonly();

  readonly filteredBooks = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    return this.booksState().filter((book) => {
      const matchesStatus = status === 'todos' || book.status === status;
      const matchesTerm =
        !term ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  });

  readonly selectedBook = computed(() => {
    const id = this.selectedIdState();
    const list = this.filteredBooks();
    return list.find((book) => book.id === id) ?? list[0] ?? null;
  });

  readonly selectedIndex = computed(() => {
    const selected = this.selectedBook();
    if (!selected) {
      return -1;
    }
    return this.filteredBooks().findIndex((book) => book.id === selected.id);
  });

  readonly readingNow = computed(
    () => this.booksState().filter((book) => book.status === 'lendo').length,
  );

  readonly pagesRead = computed(() =>
    this.booksState().reduce((sum, book) => sum + book.currentPage, 0),
  );

  readonly readingDaysThisMonth = signal(7);

  readonly weeklyStreak = signal([true, true, true, true, false, false, false]);

  readonly notes = computed(() =>
    this.booksState()
      .filter((book) => book.note.trim().length > 0)
      .map((book) => ({
        bookId: book.id,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        note: book.note,
      })),
  );

  readonly currentQuote = computed<DailyQuote>(
    () => DAILY_QUOTES[this.quoteIndex() % DAILY_QUOTES.length],
  );

  select(id: string): void {
    this.selectedIdState.set(id);
  }

  selectRelative(offset: number): void {
    const list = this.filteredBooks();
    if (!list.length) {
      return;
    }
    const current = Math.max(this.selectedIndex(), 0);
    const next = (current + offset + list.length) % list.length;
    this.selectedIdState.set(list[next].id);
  }

  updateProgress(id: string, currentPage: number): void {
    this.patch(id, {
      currentPage: Math.min(Math.max(currentPage, 0), this.bookById(id)?.totalPages ?? currentPage),
    });
  }

  updateStatus(id: string, status: BookStatus): void {
    const patch: Partial<Book> = { status };
    if (status === 'lido') {
      const book = this.bookById(id);
      if (book) {
        patch.currentPage = book.totalPages;
      }
    }
    this.patch(id, patch);
  }

  updateRating(id: string, rating: number): void {
    this.patch(id, { rating });
  }

  updateNote(id: string, note: string): void {
    this.patch(id, { note });
  }

  addBook(input: NewBookInput): void {
    const book: Book = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      author: input.author.trim(),
      genre: input.genre.trim() || 'Ficção',
      coverUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=500&fit=crop',
      totalPages: input.totalPages,
      currentPage: input.status === 'lido' ? input.totalPages : 0,
      status: input.status,
      rating: 0,
      startedAt: new Date().toISOString().slice(0, 10),
      note: '',
      updatedAt: new Date().toISOString(),
    };
    this.booksState.update((books) => [book, ...books]);
    this.selectedIdState.set(book.id);
  }

  nextQuote(): void {
    this.quoteIndex.update((index) => index + 1);
  }

  previousQuote(): void {
    this.quoteIndex.update((index) => index - 1 + DAILY_QUOTES.length);
  }

  private bookById(id: string): Book | undefined {
    return this.booksState().find((book) => book.id === id);
  }

  private patch(id: string, changes: Partial<Book>): void {
    this.booksState.update((books) =>
      books.map((book) =>
        book.id === id ? { ...book, ...changes, updatedAt: new Date().toISOString() } : book,
      ),
    );
  }
}
