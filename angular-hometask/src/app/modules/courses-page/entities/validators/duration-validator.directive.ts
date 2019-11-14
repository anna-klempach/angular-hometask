import { AbstractControl } from '@angular/forms';

export function durationValidator(control: AbstractControl): { [key: string]: boolean } {
  return parseInt(control.value, 10)
  ? null
  : { forbiddenDurationFormat: true };
}
