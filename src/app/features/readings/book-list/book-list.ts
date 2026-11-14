import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Book, BookStatus } from '../../../core/models/book.model';
import { BookFilters } from '../book-filters/book-filters';
import { BookListItem } from '../book-list-item/book-list-item';

@Component({
  selector: 'app-book-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookFilters, BookListItem],
  template: `
    <section class="flex h-full flex-col rounded-2xl border border-line bg-card p-4">
      <app-book-filters
        [search]="search()"
        (searchChange)="searchChange.emit($event)"
        [status]="status()"
        (statusChange)="statusChange.emit($event)"
      />
      <div class="mt-3 flex-1 space-y-1">
        @for (book of books(); track book.id) {
          <app-book-list-item
            [book]="book"
            [selected]="book.id === selectedId()"
            (select)="select.emit($event)"
          />
        } @empty {
          <p class="px-3 py-8 text-center text-sm text-muted">Nenhum livro encontrado.</p>
        }
      </div>
      <div class="mt-3 flex items-center justify-between px-2 text-xs text-muted">
        <span class="flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-sage"></span>
          Atualizado hoje
        </span>
        <span>{{ books().length }} livros</span>
      </div>
    </section>
  `,
})
export class BookList {
  readonly books = input.required<Book[]>();
  readonly selectedId = input<string | null>(null);
  readonly search = input('');
  readonly status = input<BookStatus | 'todos'>('todos');
  readonly searchChange = output<string>();
  readonly statusChange = output<BookStatus | 'todos'>();
  readonly select = output<string>();
}
