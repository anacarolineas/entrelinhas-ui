import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { WeeklyStreak } from '../../shared/weekly-streak/weekly-streak';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, WeeklyStreak],
  host: {
    class: 'flex h-full w-[248px] shrink-0',
  },
  template: `
    <aside class="flex h-full w-full flex-col overflow-hidden bg-sidebar px-5 py-6">
      <a routerLink="/leituras" class="mb-10 flex items-center gap-2.5 text-forest">
        <span class="grid h-9 w-9 place-items-center rounded-lg border border-[#d7d4c8] bg-card">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </span>
        <span class="font-serif text-[22px] leading-none tracking-tight">entrelinhas<span class="text-forest">.</span></span>
      </a>

      <p class="mb-3 text-[10px] font-medium tracking-[0.18em] text-muted uppercase">Seu espaço</p>

      <nav class="flex flex-col gap-1 text-sm">
        <a
          routerLink="/leituras"
          routerLinkActive="bg-[#e4e6db] text-ink font-medium"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[#6f6b63] transition hover:bg-[#e8e9e1]"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Minhas leituras
          <span class="ml-auto text-xs text-muted">{{ books.books().length }}</span>
        </a>
        <a
          routerLink="/notas"
          routerLinkActive="bg-[#e4e6db] text-ink font-medium"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[#6f6b63] transition hover:bg-[#e8e9e1]"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Minhas notas
        </a>
      </nav>

      <div class="mt-8 min-w-0 rounded-2xl border border-[#e0ddd3] bg-card p-4">
        <div class="mb-3 grid h-8 w-8 place-items-center rounded-full bg-[#f3efe4] text-sage">✦</div>
        <p class="font-serif text-[17px] leading-snug">Seu cantinho de leitura</p>
        <p class="mt-1 text-[12px] leading-relaxed text-muted">
          Um pouco de cada vez. Cada página conta.
        </p>
        <div class="mt-4">
          <app-weekly-streak [active]="books.weeklyStreak()" />
        </div>
      </div>

      <div class="mt-auto flex items-center gap-3 pt-6">
        <div class="grid h-10 w-10 place-items-center rounded-full bg-[#ddd6c8] font-medium text-ink">M</div>
        <div class="min-w-0">
          <p class="truncate text-sm font-medium">Mariana Costa</p>
          <p class="text-xs text-muted">Leitora curiosa</p>
        </div>
        <button type="button" class="ml-auto text-muted" aria-label="Mais opções">⋯</button>
      </div>
    </aside>
  `,
})
export class Sidebar {
  protected readonly books = inject(BookService);
}
