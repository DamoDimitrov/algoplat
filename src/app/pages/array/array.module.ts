import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArrayComponent} from "./array.component";
import {ArrayAnimationComponent} from "./animation/array-animation.component";
import {ArrayInputComponent} from "./input/array-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ArrayComponent,
    ArrayAnimationComponent,
    ArrayInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArrayModule {
}
