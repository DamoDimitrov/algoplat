import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeSortComponent } from './merge-sort.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MergeSortInputComponent } from './input/merge-sort-input.component';
import { MergeSortAnimationComponent } from './animation/merge-sort-animation.component';



@NgModule({
  declarations: [
    MergeSortComponent,
    MergeSortInputComponent,
    MergeSortAnimationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MergeSortModule { }
