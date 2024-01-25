import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StackComponent} from "./stack.component";
import {InputComponent} from "./input/input.component";
import {AnimationComponent} from "./animation/animation.component";
import {TabsWindowComponent} from "./tabs-window/tabs-window.component";
import {InformationComponent} from "./information/information.component";



@NgModule({
  declarations: [
    StackComponent,
    InputComponent,
    AnimationComponent,
    TabsWindowComponent,
    InformationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StackModule { }
