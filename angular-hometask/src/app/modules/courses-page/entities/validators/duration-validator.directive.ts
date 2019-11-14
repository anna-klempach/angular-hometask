import { AbstractControl } from '@angular/forms';

export function durationValidator(control: AbstractControl): { [key: string]: any } {
  if (parseInt(control.value, 10)) {
    return null;
  }
  return { forbiddenDurationFormat: { value: control.value } };
}
