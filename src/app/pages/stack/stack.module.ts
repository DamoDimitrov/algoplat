import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StackComponent} from "./stack.component";
import {StackInputComponent} from "./input/stack-input.component";
import {StackAnimationComponent} from "./animation/stack-animation.component";
import {StackTabsWindowComponent} from "./tabs-window/stack-tabs-window.component";
import {StackInformationComponent} from "./information/stack-information.component";



@NgModule({
  declarations: [
    StackComponent,
    StackInputComponent,
    StackAnimationComponent,
    StackTabsWindowComponent,
    StackInformationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StackModule { }
