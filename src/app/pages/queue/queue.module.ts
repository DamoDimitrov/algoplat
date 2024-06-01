import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueComponent} from "./queue.component";
import {QueueAnimationComponent} from "./animation/queue-animation.component";
import {QueueInputComponent} from "./input/queue-input.component";


@NgModule({
  declarations: [
    QueueComponent,
    QueueAnimationComponent,
    QueueInputComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QueueModule {
}
