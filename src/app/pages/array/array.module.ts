import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArrayComponent} from "./array.component";
<<<<<<< Updated upstream
import {AnimationComponent} from "./animation/animation.component";
import {InputComponent} from "./input/input.component";
=======
import {ArrayAnimationComponent} from "./animation/array-animation.component";
import {ArrayInputComponent} from "./input/array-input.component";
>>>>>>> Stashed changes
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ArrayComponent,
<<<<<<< Updated upstream
    AnimationComponent,
    InputComponent,
    InputComponent
=======
    ArrayAnimationComponent,
    ArrayInputComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArrayModule {
}
