import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  template: `
    <header class="flex shrink-0 items-center justify-between px-8 py-5">
      <p class="text-xs text-muted">
        Meu espaço
        <span class="mx-1.5">/</span>
        <span class="font-medium text-ink">{{ currentPage() }}</span>
      </p>
      <div class="flex items-center gap-4">
        <p class="text-[11px] tracking-[0.14em] text-muted uppercase">
          {{ today | date: dateFormat : undefined : 'pt-BR' }}
        </p>
        <div class="grid h-8 w-8 place-items-center rounded-full bg-[#ddd6c8] text-xs font-medium">M</div>
      </div>
    </header>
  `,
})
export class Topbar {
  readonly currentPage = input('Minhas leituras');
  protected readonly today = new Date();
  protected readonly dateFormat = "EEEE, d 'de' MMMM";
}
