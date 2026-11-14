import { ChangeDetectionStrategy, Component, input, linkedSignal, output, signal } from '@angular/core';
import { BookStatus } from '../../../core/models/book.model';
import { StatusPicker } from '../../../shared/status-picker/status-picker';

@Component({
  selector: 'app-progress-updater',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatusPicker],
  template: `
    <div class="fixed inset-0 z-50 grid place-items-center bg-[#2c2a27]/30 p-4" (click)="closed.emit()">
      <form
        class="w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-xl"
        (click)="$event.stopPropagation()"
        (submit)="submit($event)"
      >
        <h2 class="font-serif text-2xl">Atualizar leitura</h2>
        <p class="mt-1 text-sm text-muted">Ajuste o status e registre até onde você chegou.</p>

        <p class="mt-5 text-xs tracking-wide text-muted uppercase">Status</p>
        <div class="mt-2">
          <app-status-picker [value]="draftStatus()" (select)="draftStatus.set($event)" />
        </div>

        <p class="mt-5 text-xs tracking-wide text-muted uppercase">Progresso</p>
        <div class="mt-2 flex items-center gap-2">
          <input
            class="w-24 rounded-xl border border-line bg-card px-3 py-2.5 text-sm outline-none"
            type="number"
            min="0"
            [max]="percentMode() ? 100 : totalPages()"
            [value]="displayValue()"
            (input)="draft.set($any($event.target).valueAsNumber || 0)"
          />
          <button
            type="button"
            class="rounded-xl border border-line px-3 py-2.5 text-sm"
            [class.bg-soft]="!percentMode()"
            (click)="percentMode.set(false); draft.set(null)"
          >
            páginas
          </button>
          <button
            type="button"
            class="rounded-xl border border-line px-3 py-2.5 text-sm"
            [class.bg-soft]="percentMode()"
            (click)="switchToPercent()"
          >
            %
          </button>
        </div>
        <p class="mt-2 text-xs text-muted">{{ currentPage() }} de {{ totalPages() }} páginas agora.</p>

        <div class="mt-6 flex justify-end gap-2">
          <button type="button" class="rounded-xl px-4 py-2 text-sm text-muted" (click)="closed.emit()">Cancelar</button>
          <button type="submit" class="rounded-xl bg-forest px-4 py-2 text-sm text-white">Salvar</button>
        </div>
      </form>
    </div>
  `,
})
export class ProgressUpdater {
  readonly currentPage = input(0);
  readonly totalPages = input(1);
  readonly status = input.required<BookStatus>();
  readonly save = output<{ currentPage: number; status: BookStatus }>();
  readonly closed = output<void>();

  protected readonly percentMode = signal(false);
  protected readonly draft = signal<number | null>(null);
  protected readonly draftStatus = linkedSignal(() => this.status());

  protected displayValue(): number {
    const draft = this.draft();
    if (draft !== null) {
      return draft;
    }
    if (this.percentMode()) {
      return Math.round((this.currentPage() / this.totalPages()) * 100);
    }
    return this.currentPage();
  }

  protected switchToPercent(): void {
    this.percentMode.set(true);
    this.draft.set(Math.round((this.currentPage() / this.totalPages()) * 100));
  }

  protected submit(event: Event): void {
    event.preventDefault();
    const value = this.displayValue();
    const pages = this.percentMode() ? Math.round((value / 100) * this.totalPages()) : value;
    this.save.emit({ currentPage: pages, status: this.draftStatus() });
  }
}
