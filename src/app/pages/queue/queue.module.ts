import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueAnimationComponent} from "./animation/queue-animation.component";
import {QueueInputComponent} from "./input/queue-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { QueueComponent } from './queue.component';
import { InformationModule } from 'src/app/components/information/information.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    QueueComponent,
    QueueAnimationComponent,
    QueueInputComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    InformationModule
  ]
})
export class QueueModule {
}
