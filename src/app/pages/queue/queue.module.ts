import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueComponent} from "./queue.component";
import {AnimationComponent} from "./animation/animation.component";
import {InputComponent} from "./input/input.component";


@NgModule({
  declarations: [
    QueueComponent,
    AnimationComponent,
    InputComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QueueModule {
}
