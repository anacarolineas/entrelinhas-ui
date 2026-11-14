import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-notes-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section>
      <p class="text-[11px] tracking-[0.16em] text-muted uppercase">Guardadas entre as páginas</p>
      <h1 class="mt-2 font-serif text-4xl">Minhas notas</h1>
      <p class="mt-2 max-w-xl text-sm text-muted">
        Frases, ideias e pausas que você marcou nos livros. Um caderno leve, sem pressa.
      </p>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        @for (note of books.notes(); track note.bookId) {
          <article class="rounded-2xl border border-line bg-card p-5">
            <div class="flex items-center gap-3">
              <img [src]="note.coverUrl" [alt]="note.title" class="h-12 w-9 rounded-md object-cover" />
              <div>
                <p class="font-medium">{{ note.title }}</p>
                <p class="text-xs text-muted">{{ note.author }}</p>
              </div>
            </div>
            <p class="mt-4 font-serif text-lg leading-relaxed italic">{{ note.note }}</p>
            <a routerLink="/leituras" class="mt-4 inline-block text-sm text-forest" (click)="books.select(note.bookId)">
              Abrir leitura ›
            </a>
          </article>
        } @empty {
          <p class="text-sm text-muted">Ainda não há notas. Elas aparecem quando você escreve no painel do livro.</p>
        }
      </div>
    </section>
  `,
})
export class NotesPage {
  protected readonly books = inject(BookService);
}
