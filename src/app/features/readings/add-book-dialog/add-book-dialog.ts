import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { BookStatus } from '../../../core/models/book.model';
import { NewBookInput } from '../../../core/services/book.service';

@Component({
  selector: 'app-add-book-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 grid place-items-center bg-[#2c2a27]/30 p-4" (click)="closed.emit()">
      <form
        class="w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-xl"
        (click)="$event.stopPropagation()"
        (submit)="submit($event)"
      >
        <h2 class="font-serif text-2xl">Adicionar livro</h2>
        <p class="mt-1 text-sm text-muted">Um título novo para o seu ritmo.</p>

        <label class="mt-5 block text-xs tracking-wide text-muted uppercase">Título</label>
        <input class="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm outline-none" [value]="title()" (input)="title.set($any($event.target).value)" required />

        <label class="mt-4 block text-xs tracking-wide text-muted uppercase">Autor</label>
        <input class="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm outline-none" [value]="author()" (input)="author.set($any($event.target).value)" required />

        <label class="mt-4 block text-xs tracking-wide text-muted uppercase">Gênero</label>
        <input class="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm outline-none" [value]="genre()" (input)="genre.set($any($event.target).value)" />

        <div class="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs tracking-wide text-muted uppercase">Páginas</label>
            <input class="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm outline-none" type="number" min="1" [value]="pages()" (input)="pages.set($any($event.target).valueAsNumber || 1)" />
          </div>
          <div>
            <label class="block text-xs tracking-wide text-muted uppercase">Status</label>
            <select class="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm outline-none" [value]="status()" (change)="status.set($any($event.target).value)">
              <option value="quero-ler">Quero ler</option>
              <option value="lendo">Lendo</option>
              <option value="pausado">Pausado</option>
              <option value="lido">Lido</option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button type="button" class="rounded-xl px-4 py-2 text-sm text-muted" (click)="closed.emit()">Cancelar</button>
          <button type="submit" class="rounded-xl bg-forest px-4 py-2 text-sm text-white">Guardar</button>
        </div>
      </form>
    </div>
  `,
})
export class AddBookDialog {
  readonly saved = output<NewBookInput>();
  readonly closed = output<void>();

  protected readonly title = signal('');
  protected readonly author = signal('');
  protected readonly genre = signal('Ficção');
  protected readonly pages = signal(200);
  protected readonly status = signal<BookStatus>('quero-ler');

  protected submit(event: Event): void {
    event.preventDefault();
    if (!this.title().trim() || !this.author().trim()) {
      return;
    }
    this.saved.emit({
      title: this.title(),
      author: this.author(),
      genre: this.genre(),
      totalPages: this.pages(),
      status: this.status(),
    });
  }
}
