import { AbstractControl } from '@angular/forms';

export function durationValidator(control: AbstractControl): { [key: string]: any } | null {
  if (+control.value) {
    return null;
  }
  return { forbiddenDurationFormat: { value: control.value } };
}
