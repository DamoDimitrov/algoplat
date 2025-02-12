import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleSortComponent } from './bubble-sort.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BubbleSortInputComponent } from './input/bubble-sort-input.component';
import { BubbleSortAnimationComponent } from './animation/bubble-sort-animation.component';
import { SourceCodeComponent } from 'src/app/components/source-code/source-code.component';
import { SourceCodeModule } from 'src/app/components/source-code/source-code.module';



@NgModule({
  declarations: [
    BubbleSortComponent,
    BubbleSortInputComponent,
    BubbleSortAnimationComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SourceCodeModule
  ]
})
export class BubbleSortModule { }
