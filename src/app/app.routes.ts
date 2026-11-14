import { Routes } from '@angular/router';
import { AppShell } from './layout/app-shell/app-shell';
import { NotesPage } from './features/notes/notes-page/notes-page';
import { ReadingsPage } from './features/readings/readings-page/readings-page';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'leituras' },
      { path: 'leituras', component: ReadingsPage },
      { path: 'notas', component: NotesPage },
    ],
  },
];
