import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  @Input() name;
  public value: string;
  public disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    this.value = outsideValue;
    if (this.value.length === 10) {
      console.log('from writevalue:', this.value);
      this.onChange(this.value);
      console.log('from component', this.name.errors);
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