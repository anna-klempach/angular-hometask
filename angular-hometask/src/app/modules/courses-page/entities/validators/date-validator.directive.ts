import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
const dateReg = new RegExp('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4})$');

export function dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const allowed = dateReg.test(control.value);
    console.log(allowed);
    return allowed ? null : { forbiddenDateFormat: { value: control.value } };
}
@Directive({
  selector: '[appDateValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true }]
})
export class DateValidatorDirective implements Validator {
  @Input('appDateValidator') allowedDateFormat: string;
  validate = dateValidator;
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}

