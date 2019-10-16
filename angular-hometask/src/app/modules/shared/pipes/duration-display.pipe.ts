import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationDisplay'
})
export class DurationDisplayPipe implements PipeTransform {

  transform(value: number): string {
    let mins: string;
    let hours: string;
    if (value < 60) {
      if (value < 10) {
        mins = `0${value}`;
      } else {
        mins = `${value}`;
      }
      return `${mins} min`;
    }
    hours = `${Math.floor(value / 60)}`;
    const minsLeft = value % 60;
    if (minsLeft < 10) {
      mins = `0${minsLeft}`;
    } else {
      mins = `${minsLeft}`;
    }
    return `${hours} h ${mins} min`;
  }

}