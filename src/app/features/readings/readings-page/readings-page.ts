import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BookStatus } from '../../../core/models/book.model';
import { BookService, NewBookInput } from '../../../core/services/book.service';
import { AddBookDialog } from '../add-book-dialog/add-book-dialog';
import { BookDetail } from '../book-detail/book-detail';
import { BookList } from '../book-list/book-list';
import { QuoteBanner } from '../quote-banner/quote-banner';
import { StatsCards } from '../stats-cards/stats-cards';

@Component({
  selector: 'app-readings-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, UpperCasePipe, AddBookDialog, BookDetail, BookList, QuoteBanner, StatsCards],
  template: `
    <div class="space-y-8">
      <section class="flex items-end justify-between gap-6">
        <div>
          <p class="flex items-center gap-2 text-[11px] tracking-[0.16em] text-muted uppercase">
            <span class="h-1.5 w-1.5 rounded-full bg-sage"></span>
            {{ today | date: "EEEE, d 'de' MMMM 'de' y" : undefined : 'pt-BR' | uppercase }}
          </p>
          <h1 class="mt-3 font-serif text-5xl tracking-tight">Um capítulo de cada vez.</h1>
          <p class="mt-2 text-sm text-muted">Suas leituras, ideias e pequenos momentos de pausa.</p>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-3 text-sm text-white"
          (click)="dialogOpen.set(true)"
        >
          <span>+</span> Adicionar livro
        </button>
      </section>

      <app-stats-cards
        [readingNow]="books.readingNow()"
        [pagesRead]="books.pagesRead()"
        [days]="books.readingDaysThisMonth()"
      />

      <section>
        <div class="mb-4 mt-4 flex items-end justify-between">
          <div>
            <p class="text-[11px] tracking-[0.16em] text-muted uppercase">Acompanhe por aqui</p>
            <h2 class="font-serif text-3xl mt-2">
              Últimos livros
              <span class="ml-2 align-middle text-base text-muted">{{ books.books().length }}</span>
            </h2>
          </div>
          <button type="button" class="text-sm text-forest" (click)="clearFilters()">Ver todos ›</button>
        </div>

        <div class="grid items-start gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <app-book-list
            [books]="books.filteredBooks()"
            [selectedId]="books.selectedBook()?.id ?? null"
            [search]="books.search()"
            [status]="books.statusFilter()"
            (searchChange)="books.search.set($event)"
            (statusChange)="books.statusFilter.set($event)"
            (select)="books.select($event)"
          />
          <app-book-detail
            [book]="books.selectedBook()"
            [index]="Math.max(books.selectedIndex(), 0)"
            [total]="books.filteredBooks().length"
            (previous)="books.selectRelative(-1)"
            (next)="books.selectRelative(1)"
            (statusChange)="onStatus($event)"
            (ratingChange)="onRating($event)"
            (progressChange)="onProgress($event)"
          />
        </div>
      </section>

      <app-quote-banner
        [quote]="books.currentQuote()"
        (previous)="books.previousQuote()"
        (next)="books.nextQuote()"
      />

      <p class="text-center text-xs text-muted">Feito para ler sem pressa · entrelinhas.</p>
    </div>

    @if (dialogOpen()) {
      <app-add-book-dialog (closed)="dialogOpen.set(false)" (saved)="addBook($event)" />
    }
  `,
})
export class ReadingsPage {
  protected readonly books = inject(BookService);
  protected readonly today = new Date();
  protected readonly dialogOpen = signal(false);
  protected readonly Math = Math;

  protected clearFilters(): void {
    this.books.search.set('');
    this.books.statusFilter.set('todos');
  }

  protected addBook(input: NewBookInput): void {
    this.books.addBook(input);
    this.dialogOpen.set(false);
  }

  protected onStatus(status: BookStatus): void {
    const book = this.books.selectedBook();
    if (book) {
      this.books.updateStatus(book.id, status);
    }
  }

  protected onRating(rating: number): void {
    const book = this.books.selectedBook();
    if (book) {
      this.books.updateRating(book.id, rating);
    }
  }

  protected onProgress(page: number): void {
    const book = this.books.selectedBook();
    if (book) {
      this.books.updateProgress(book.id, page);
    }
  }
}
