import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Book } from '../../../core/models/book.model';
import { StatusBadge } from '../../../shared/status-badge/status-badge';

@Component({
  selector: 'app-book-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatusBadge],
  template: `
    <button
      type="button"
      class="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition"
      [class.bg-[#f3f1e8]]="selected()"
      [class.hover:bg-soft]="!selected()"
      (click)="select.emit(book().id)"
    >
      <img [src]="book().coverUrl" [alt]="book().title" class="h-14 w-11 rounded-lg object-cover" />
      <div class="min-w-0 flex-1">
        <p class="truncate font-medium">{{ book().title }}</p>
        <p class="text-xs text-muted">{{ book().author }}</p>
        <div class="mt-1">
          <app-status-badge [status]="book().status" />
        </div>
        <div class="mt-2 flex items-center gap-3">
          <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-[#ece8de]">
            <div class="h-full rounded-full bg-sage" [style.width.%]="percent()"></div>
          </div>
          <p class="text-[11px] whitespace-nowrap text-muted">
            {{ book().currentPage }} de {{ book().totalPages }} páginas
            <span class="ml-1">{{ percent() }}%</span>
          </p>
        </div>
      </div>
      <span class="text-muted">›</span>
    </button>
  `,
})
export class BookListItem {
  readonly book = input.required<Book>();
  readonly selected = input(false);
  readonly select = output<string>();

  protected readonly percent = computed(() => {
    const book = this.book();
    if (!book.totalPages) {
      return 0;
    }
    return Math.round((book.currentPage / book.totalPages) * 100);
  });
}
