import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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

  public value: string;
  public disabled = false;
  private onChange = (value: any) => {};
  private onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    // получить из Forms API
    this.value = outsideValue;
    if (this.value.length === 10) {
      console.log('from writevalue:', this.value);
      this.onChange(new Date(this.value)); // уведомить Forms API
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleInput(event: KeyboardEvent) {
    this.value = (event.target as HTMLInputElement).value; // html
    console.log('from insideValue:', this.value);
    this.writeValue(this.value);
    this.onTouched();
  }
}
