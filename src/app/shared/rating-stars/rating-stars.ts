import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-1" role="radiogroup" aria-label="Avaliação">
      @for (star of stars; track star) {
        <button
          type="button"
          class="text-lg leading-none transition hover:scale-105"
          [class.text-sage]="star <= value()"
          [class.text-line]="star > value()"
          (click)="rated.emit(star)"
          [attr.aria-label]="star + ' de 5'"
        >
          ★
        </button>
      }
    </div>
  `,
})
export class RatingStars {
  readonly value = input(0);
  readonly rated = output<number>();
  protected readonly stars = [1, 2, 3, 4, 5];
}
