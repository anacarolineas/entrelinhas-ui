import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DailyQuote } from '../../../core/models/book.model';

@Component({
  selector: 'app-quote-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden rounded-2xl border border-line bg-[#f6f2e8] px-6 py-5">
      <p class="text-[11px] tracking-[0.18em] text-muted uppercase">“ Um pensamento para hoje</p>
      <p class="mt-2 font-serif text-2xl italic">“{{ quote().text }}”</p>
      <p class="mt-2 text-sm text-muted">— {{ quote().author }}</p>
      <p class="pointer-events-none absolute right-6 bottom-2 font-serif text-3xl text-[#e7e0d2] italic">
        a pausa também faz parte da leitura
      </p>
      <div class="absolute top-4 right-4 flex gap-2">
        <button type="button" class="grid h-8 w-8 place-items-center rounded-full border border-line bg-card" (click)="previous.emit()">‹</button>
        <button type="button" class="grid h-8 w-8 place-items-center rounded-full border border-line bg-card" (click)="next.emit()">›</button>
      </div>
    </section>
  `,
})
export class QuoteBanner {
  readonly quote = input.required<DailyQuote>();
  readonly previous = output<void>();
  readonly next = output<void>();
}
