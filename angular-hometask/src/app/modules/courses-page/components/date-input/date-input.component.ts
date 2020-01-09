import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateInputComponent),
    multi: true
  }]
})
export class DateInputComponent implements ControlValueAccessor {

  @Input() errorStateMatcher: ErrorStateMatcher;
  @Input() name: FormControl;
  public value: string;
  public disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };
  public get OnChange() {return this.onChange; }
  public get OnTouched() {return this.onTouched; }

  constructor(private translate: TranslateService) {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    this.value = outsideValue;
    if (this.value && this.value.length === 10) {
      this.OnChange(this.value);
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleInput(event: KeyboardEvent) {
    this.value = (event.target as HTMLInputElement).value;
    this.writeValue(this.value);
    this.onTouched();
  }
}
