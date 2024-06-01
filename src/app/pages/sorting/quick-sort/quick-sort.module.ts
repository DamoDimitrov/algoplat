import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuickSortComponent} from "./quick-sort.component";
import {QuickSortAnimationComponent} from "./animation/quick-sort-animation.component";
import {QuickSortInputComponent} from "./input/quick-sort-input.component";


@NgModule({
  declarations: [
    QuickSortComponent,
    QuickSortAnimationComponent,
    QuickSortInputComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QuickSortModule {
}
