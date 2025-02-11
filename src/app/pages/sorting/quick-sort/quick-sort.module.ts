import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuickSortComponent} from "./quick-sort.component";
import {QuickSortAnimationComponent} from "../shared/animation/quick-sort-animation.component";
import {QuickSortInputComponent} from "./input/quick-sort-input.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    QuickSortComponent,
    QuickSortAnimationComponent,
    QuickSortInputComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class QuickSortModule {
}