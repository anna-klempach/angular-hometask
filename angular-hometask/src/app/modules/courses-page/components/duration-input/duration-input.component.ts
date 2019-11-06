import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationInputComponent),
    multi: true
  }],
})
export class DurationInputComponent implements ControlValueAccessor {
  @Input() errorStateMatcher: ErrorStateMatcher;
  @Input() name;

  public value: string;
  public disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(private translate: TranslateService) {
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    this.value = outsideValue;
    this.onChange(this.value);
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
