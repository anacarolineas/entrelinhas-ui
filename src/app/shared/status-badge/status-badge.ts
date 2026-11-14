import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BookStatus, STATUS_LABEL } from '../../core/models/book.model';

@Component({
  selector: 'app-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
      [class]="tone()"
    >
      {{ label() }}
    </span>
  `,
})
export class StatusBadge {
  readonly status = input.required<BookStatus>();

  protected readonly label = () => STATUS_LABEL[this.status()];

  protected readonly tone = () => {
    switch (this.status()) {
      case 'lendo':
        return 'bg-[#e7eadc] text-[#4d5a3d]';
      case 'lido':
        return 'bg-[#e3ebe0] text-[#3f5a3d]';
      case 'pausado':
        return 'bg-[#f3e6e4] text-[#8a5b58]';
      default:
        return 'bg-[#eee9de] text-[#6b675e]';
    }
  };
}
