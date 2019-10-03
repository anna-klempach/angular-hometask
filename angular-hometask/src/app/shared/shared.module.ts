import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationDisplayPipe } from '../pipes/duration-display.pipe';



@NgModule({
  declarations: [
    DurationDisplayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [DurationDisplayPipe],
})
export class SharedModule { }
