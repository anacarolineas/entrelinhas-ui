import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Book, BookStatus, STATUS_LABEL } from '../../../core/models/book.model';
import { RatingStars } from '../../../shared/rating-stars/rating-stars';
import { ProgressUpdater } from '../progress-updater/progress-updater';

@Component({
  selector: 'app-book-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, UpperCasePipe, RatingStars, ProgressUpdater],
  template: `
    @if (book(); as book) {
      <section class="flex h-full flex-col rounded-2xl border border-line bg-card p-5">
        <div class="flex items-center justify-between text-xs text-muted">
          <button type="button" class="flex items-center gap-2" (click)="editing.set(true)">
            <span class="h-1.5 w-1.5 rounded-full bg-sage"></span>
            {{ labels[book.status] | uppercase }}
          </button>
          <div class="flex items-center gap-2">
            <span>{{ index() + 1 }} de {{ total() }}</span>
            <button class="grid h-7 w-7 place-items-center rounded-full border border-line" (click)="previous.emit()" type="button">‹</button>
            <button class="grid h-7 w-7 place-items-center rounded-full border border-line" (click)="next.emit()" type="button">›</button>
          </div>
        </div>

        <div class="mt-5 flex gap-4">
          <img [src]="book.coverUrl" [alt]="book.title" class="h-24 w-[72px] rounded-xl object-cover" />
          <div>
            <p class="text-[11px] tracking-[0.14em] text-muted uppercase">{{ book.genre }}</p>
            <h2 class="font-serif text-2xl leading-tight">{{ book.title }}</h2>
            <p class="text-sm text-muted">{{ book.author }}</p>
            @if (book.startedAt) {
              <p class="mt-2 flex items-center gap-2 text-xs text-muted">
                <span>◷</span>
                Comecei em {{ book.startedAt | date: 'dd/MM/yyyy' }}
              </p>
            }
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div>
            <p class="text-[11px] tracking-[0.16em] text-muted uppercase">Sua avaliação</p>
            <app-rating-stars [value]="book.rating" (rated)="ratingChange.emit($event)" />
          </div>
          <p class="text-sm text-muted">{{ book.rating }}/5</p>
        </div>

        <div class="mt-6">
          <p class="text-[11px] tracking-[0.16em] text-muted uppercase">Seu progresso</p>
          <div class="mt-2 flex items-end justify-between">
            <p class="font-serif text-4xl">{{ percent() }}%</p>
            <p class="text-sm text-muted">{{ book.currentPage }} / {{ book.totalPages }} págs.</p>
          </div>
          <div class="relative mt-3 h-2 rounded-full bg-[#ece8de]">
            <div class="h-full rounded-full bg-sage" [style.width.%]="percent()"></div>
            <span
              class="absolute top-3 text-[11px] text-muted"
              [style.left.%]="Math.min(percent(), 82)"
            >
              {{ remaining() }} páginas restantes
            </span>
          </div>
          <div class="mt-2 flex justify-between text-[11px] text-muted">
            <span>Início</span>
            <span>Fim</span>
          </div>
        </div>

        <button
          type="button"
          class="mt-8 w-full rounded-xl border border-line py-2.5 text-sm text-forest"
          (click)="editing.set(true)"
        >
          Atualizar progresso
        </button>

        <div class="mt-5 rounded-2xl border border-line bg-soft p-4">
          <div class="mb-2 flex items-center justify-between text-[11px] tracking-[0.16em] text-muted uppercase">
            <span>✎ Uma nota sua</span>
            <span>Editável</span>
          </div>
          <textarea
            class="min-h-24 w-full resize-none bg-transparent text-sm leading-relaxed outline-none"
            [value]="noteDraft() ?? book.note"
            (input)="noteDraft.set($any($event.target).value)"
          ></textarea>
          <button
            type="button"
            class="mt-2 text-sm font-medium text-forest"
            (click)="saveNote(book.note)"
          >
            Salvar nota ›
          </button>
        </div>
      </section>
    } @else {
      <section class="grid h-full place-items-center rounded-2xl border border-line bg-card p-8 text-sm text-muted">
        Selecione um livro para acompanhar.
      </section>
    }

    @if (editing() && book(); as book) {
      <app-progress-updater
        [currentPage]="book.currentPage"
        [totalPages]="book.totalPages"
        [status]="book.status"
        (closed)="editing.set(false)"
        (save)="saveProgress($event)"
      />
    }
  `,
})
export class BookDetail {
  readonly book = input<Book | null>(null);
  readonly index = input(0);
  readonly total = input(0);
  readonly previous = output<void>();
  readonly next = output<void>();
  readonly statusChange = output<BookStatus>();
  readonly ratingChange = output<number>();
  readonly progressChange = output<number>();
  readonly noteChange = output<string>();

  protected readonly labels = STATUS_LABEL;
  protected readonly editing = signal(false);
  protected readonly noteDraft = signal<string | null>(null);
  protected readonly Math = Math;

  protected readonly percent = computed(() => {
    const book = this.book();
    if (!book?.totalPages) {
      return 0;
    }
    return Math.round((book.currentPage / book.totalPages) * 100);
  });

  protected readonly remaining = computed(() => {
    const book = this.book();
    return book ? Math.max(book.totalPages - book.currentPage, 0) : 0;
  });

  protected saveNote(fallback: string): void {
    this.noteChange.emit(this.noteDraft() ?? fallback);
  }

  protected saveProgress(update: { currentPage: number; status: BookStatus }): void {
    this.progressChange.emit(update.currentPage);
    this.statusChange.emit(update.status);
    this.editing.set(false);
  }
}
