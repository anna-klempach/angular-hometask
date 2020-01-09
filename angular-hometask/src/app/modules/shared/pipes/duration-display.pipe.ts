import { Pipe, PipeTransform } from '@angular/core';

const localeValues = {
  ru: {
    min: 'мин.',
    h: 'ч.'
  },
  en: {
    min: 'min.',
    h: 'h.'
  }
};

@Pipe({
  name: 'durationDisplay'
})
export class DurationDisplayPipe implements PipeTransform {

  transform(value: number, locale?: string): string {
    let mins: string;
    let hours: string;
    if (value < 60) {
      if (value < 10) {
        mins = `0${value}`;
      } else {
        mins = `${value}`;
      }
      return `${mins} ${localeValues[locale].min}`;
    }
    hours = `${Math.floor(value / 60)}`;
    const minsLeft = value % 60;
    if (minsLeft < 10) {
      mins = `0${minsLeft}`;
    } else {
      mins = `${minsLeft}`;
    }
    return `${hours} ${localeValues[locale].h} ${mins} ${localeValues[locale].min}`;
  }
}
