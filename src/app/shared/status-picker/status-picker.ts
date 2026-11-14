import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BookStatus, STATUS_LABEL } from '../../core/models/book.model';

@Component({
  selector: 'app-status-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap gap-2">
      @for (option of options; track option) {
        <button type="button" class="rounded-full px-3 py-1.5 text-xs font-medium transition" [class]="chipClass(option)" (click)="select.emit(option)">
          {{ labels[option] }}
        </button>
      }
    </div>
  `,
})
export class StatusPicker {
  readonly value = input.required<BookStatus>();
  readonly select = output<BookStatus>();

  protected readonly labels = STATUS_LABEL;
  protected readonly options: BookStatus[] = ['quero-ler', 'lendo', 'pausado', 'lido'];

  protected chipClass(option: BookStatus): string {
    if (this.value() !== option) {
      return 'border border-line bg-card text-muted hover:bg-soft';
    }
    switch (option) {
      case 'lendo':
        return 'bg-[#e7eadc] text-[#4d5a3d] ring-1 ring-[#4d5a3d]/20';
      case 'lido':
        return 'bg-[#e3ebe0] text-[#3f5a3d] ring-1 ring-[#3f5a3d]/20';
      case 'pausado':
        return 'bg-[#f3e6e4] text-[#8a5b58] ring-1 ring-[#8a5b58]/20';
      default:
        return 'bg-[#eee9de] text-[#6b675e] ring-1 ring-[#6b675e]/20';
    }
  }
}
