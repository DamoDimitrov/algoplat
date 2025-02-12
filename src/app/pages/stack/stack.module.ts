import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StackComponent} from "./stack.component";
import {StackInputComponent} from "./input/stack-input.component";
import {StackAnimationComponent} from "./animation/stack-animation.component";
import { TranslateModule } from '@ngx-translate/core';
import { InformationModule } from 'src/app/components/information/information.module';



@NgModule({
  declarations: [
    StackComponent,
    StackInputComponent,
    StackAnimationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    InformationModule
  ]
})
export class StackModule { }
