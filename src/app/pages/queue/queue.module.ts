import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueAnimationComponent} from "./animation/queue-animation.component";
import {QueueInputComponent} from "./input/queue-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { QueueComponent } from './queue.component';


@NgModule({
  declarations: [
    QueueComponent,
    QueueAnimationComponent,
    QueueInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QueueModule {
}
