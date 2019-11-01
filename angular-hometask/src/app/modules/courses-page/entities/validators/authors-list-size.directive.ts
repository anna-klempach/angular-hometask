import { AbstractControl } from '@angular/forms';

export function authorsListValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && control.value.length > 0) {
    return null;
  }
  return { listSize: { value: control.value } };
}
