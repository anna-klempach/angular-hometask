import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationDisplayPipe } from '../pipes/duration-display.pipe';
import { PreloaderComponent } from '../core/preloader/preloader.component';



@NgModule({
  declarations: [
    DurationDisplayPipe,
    PreloaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DurationDisplayPipe,
    PreloaderComponent
  ],
})
export class SharedModule { }
