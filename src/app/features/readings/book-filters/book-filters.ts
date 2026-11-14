import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { BookStatus } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-3">
      <label class="relative flex-1">
        <span class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
        </span>
        <input
          class="w-full rounded-xl border border-line bg-card py-2 pr-3 pl-9 text-sm outline-none placeholder:text-muted focus:border-sage"
          placeholder="Buscar um livro..."
          [value]="search()"
          (input)="search.set($any($event.target).value)"
        />
      </label>
      <label class="relative">
        <span class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
        </span>
        <select
          class="appearance-none rounded-xl border border-line bg-card py-2 pr-8 pl-9 text-sm outline-none"
          [value]="status()"
          (change)="status.set($any($event.target).value)"
        >
          <option value="todos">Todos</option>
          <option value="lendo">Lendo</option>
          <option value="lido">Lido</option>
          <option value="pausado">Pausado</option>
          <option value="quero-ler">Quero ler</option>
        </select>
      </label>
    </div>
  `,
})
export class BookFilters {
  readonly search = model('');
  readonly status = model<BookStatus | 'todos'>('todos');
}
