import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleSortComponent } from './bubble-sort.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BubbleSortInputComponent } from './input/bubble-sort-input.component';
import { BubbleSortAnimationComponent } from './animation/bubble-sort-animation.component';



@NgModule({
  declarations: [
    BubbleSortComponent,
    BubbleSortInputComponent,
    BubbleSortAnimationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BubbleSortModule { }
