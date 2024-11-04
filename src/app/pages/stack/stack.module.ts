import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StackComponent} from "./stack.component";
<<<<<<< Updated upstream
import {InputComponent} from "./input/input.component";
import {AnimationComponent} from "./animation/animation.component";
import {TabsWindowComponent} from "./tabs-window/tabs-window.component";
import {InformationComponent} from "./information/information.component";
=======
import {StackInputComponent} from "./input/stack-input.component";
import {StackAnimationComponent} from "./animation/stack-animation.component";
import {StackTabsWindowComponent} from "./tabs-window/stack-tabs-window.component";
import {StackInformationComponent} from "./information/stack-information.component";
>>>>>>> Stashed changes



@NgModule({
  declarations: [
    StackComponent,
<<<<<<< Updated upstream
    InputComponent,
    AnimationComponent,
    TabsWindowComponent,
    InformationComponent
=======
    StackInputComponent,
    StackAnimationComponent,
    StackTabsWindowComponent,
    StackInformationComponent
>>>>>>> Stashed changes
  ],
  imports: [
    CommonModule
  ]
})
export class StackModule { }
