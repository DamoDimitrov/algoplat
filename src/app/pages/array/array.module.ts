import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArrayComponent} from "./array.component";
import {AnimationComponent} from "./animation/animation.component";
import {InputComponent} from "./input/input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ArrayComponent,
    AnimationComponent,
    InputComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArrayModule {
}
