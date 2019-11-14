import { AbstractControl } from '@angular/forms';

export function authorsListValidator(control: AbstractControl): { [key: string]: boolean } {
  return control.value && control.value.length > 0
  ? null
  : {listSize: true};
}
