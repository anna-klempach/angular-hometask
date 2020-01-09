import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
export class DurationInputComponent implements ControlValueAccessor, OnInit, OnDestroy{

  @Input() errorStateMatcher: ErrorStateMatcher;
  @Input() name;

  public value: string;
  public parsedValue: number;
  public disabled = false;
  public locale: string;
  private subscription: Subscription;
  private onChange = (value: any) => { };
  private onTouched = () => { };
  public get OnChange() {return this.onChange; }
  public get OnTouched() {return this.onTouched; }

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.locale = this.translate.defaultLang;
    this.subscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.locale = event.lang;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    this.value = outsideValue;
    this.parsedValue = this.value ? (parseInt(this.value, 10)) : 0;
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleInput(event: KeyboardEvent) {
    this.value = (event.target as HTMLInputElement).value;
    this.parsedValue = this.value ? (parseInt(this.value, 10)) : 0;
    this.writeValue(this.value);
    this.onTouched();
  }
}
