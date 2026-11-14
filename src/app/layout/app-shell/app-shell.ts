import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Sidebar, Topbar],
  host: {
    class: 'block h-full overflow-hidden',
  },
  template: `
    <div class="flex h-full bg-paper">
      <app-sidebar />
      <div class="flex min-h-0 min-w-0 flex-1 flex-col">
        <app-topbar [currentPage]="pageLabel()" />
        <main class="min-h-0 flex-1 overflow-y-auto px-8 pb-8">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class AppShell {
  private readonly router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly pageLabel = computed(() =>
    this.url().includes('notas') ? 'Minhas notas' : 'Minhas leituras',
  );
}
