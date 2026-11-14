import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `
    <section class="grid gap-4 md:grid-cols-3">
      <article class="rounded-2xl border border-line bg-card p-5">
        <p class="text-[11px] tracking-[0.16em] text-muted uppercase">Lendo agora</p>
        <div class="mt-4 flex items-start justify-between">
          <div>
            <p class="font-serif text-4xl tracking-tight">{{ readingNow() | number: '2.0-0' }}</p>
            <p class="mt-1 text-xs text-muted">livros em andamento</p>
          </div>
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-[#eef0e6] text-sage">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </span>
        </div>
      </article>

      <article class="rounded-2xl border border-line bg-card p-5">
        <p class="text-[11px] tracking-[0.16em] text-muted uppercase">Páginas lidas</p>
        <div class="mt-4 flex items-start justify-between">
          <div>
            <p class="font-serif text-4xl tracking-tight">{{ pagesRead() }}</p>
            <p class="mt-1 text-xs text-muted">somando todos os livros</p>
          </div>
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-[#f6eee9] text-blush">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </span>
        </div>
      </article>

      <article class="rounded-2xl border border-line bg-card p-5">
        <p class="text-[11px] tracking-[0.16em] text-muted uppercase">No seu ritmo</p>
        <div class="mt-4 flex items-start justify-between">
          <div>
            <p class="font-serif text-4xl tracking-tight">{{ days() }} <span class="text-2xl">dias</span></p>
            <p class="mt-1 text-xs text-muted">de leitura neste mês</p>
          </div>
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-[#f1ecf6] text-[#b7a3c9]">✦</span>
        </div>
      </article>
    </section>
  `,
})
export class StatsCards {
  readonly readingNow = input(0);
  readonly pagesRead = input(0);
  readonly days = input(0);
}
