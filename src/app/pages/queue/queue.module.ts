import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueComponent} from "./queue.component";
<<<<<<< Updated upstream
import {AnimationComponent} from "./animation/animation.component";
import {InputComponent} from "./input/input.component";
=======
import {QueueAnimationComponent} from "./animation/queue-animation.component";
import {QueueInputComponent} from "./input/queue-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    QueueComponent,
<<<<<<< Updated upstream
    AnimationComponent,
    InputComponent
  ],
  imports: [
    CommonModule
=======
    QueueAnimationComponent,
    QueueInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
>>>>>>> Stashed changes
  ]
})
export class QueueModule {
}
