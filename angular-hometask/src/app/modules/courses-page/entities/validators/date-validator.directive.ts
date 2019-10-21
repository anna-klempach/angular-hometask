import { AbstractControl } from '@angular/forms';

const dateReg = new RegExp('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4})$');

export function dateValidator(control: AbstractControl): { [key: string]: any } | null {
  const allowed = dateReg.test(control.value);
  console.log(allowed);
  return allowed ? null : { forbiddenDateFormat: { value: control.value } };
}
