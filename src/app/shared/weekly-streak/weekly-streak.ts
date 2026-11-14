import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-weekly-streak',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full min-w-0',
  },
  template: `
    <div class="flex w-full items-end justify-between gap-0.5">
      @for (day of days; track day.label; let i = $index) {
        <div class="flex min-w-0 flex-1 flex-col items-center gap-1.5">
          <span
            class="h-2 w-full max-w-5 rounded-full"
            [class.bg-forest]="active()[i]"
            [class.bg-[#d8d5cc]]="!active()[i]"
          ></span>
          <span class="w-full truncate text-center text-[8px] tracking-normal text-muted uppercase">{{
            day.label
          }}</span>
        </div>
      }
    </div>
  `,
})
export class WeeklyStreak {
  readonly active = input.required<boolean[]>();
  protected readonly days = [
    { label: 'SEG' },
    { label: 'TER' },
    { label: 'QUA' },
    { label: 'QUI' },
    { label: 'SEX' },
    { label: 'SÁB' },
    { label: 'DOM' },
  ];
}
