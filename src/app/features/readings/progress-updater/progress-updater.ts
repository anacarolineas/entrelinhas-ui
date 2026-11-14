import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-progress-updater',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p class="text-[11px] tracking-[0.16em] text-muted uppercase">Atualizar progresso</p>
      <div class="mt-3 flex items-center gap-2">
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
          (click)="percentMode.set(false)"
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
        <button
          type="button"
          class="ml-auto grid h-10 w-10 place-items-center rounded-xl bg-forest text-white"
          (click)="submit()"
          aria-label="Salvar progresso"
        >
          ›
        </button>
      </div>
      <p class="mt-2 text-xs text-muted">Registre a página atual ou alterne para porcentagem.</p>
    </div>
  `,
})
export class ProgressUpdater {
  readonly currentPage = input(0);
  readonly totalPages = input(1);
  readonly save = output<number>();

  protected readonly percentMode = signal(false);
  protected readonly draft = signal<number | null>(null);

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

  protected submit(): void {
    const value = this.displayValue();
    const pages = this.percentMode()
      ? Math.round((value / 100) * this.totalPages())
      : value;
    this.save.emit(pages);
    this.draft.set(null);
  }
}
