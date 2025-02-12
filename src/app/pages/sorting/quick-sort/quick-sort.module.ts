import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuickSortComponent} from "./quick-sort.component";
import {QuickSortAnimationComponent} from "../shared/animation/quick-sort-animation.component";
import {QuickSortInputComponent} from "./input/quick-sort-input.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SourceCodeModule } from 'src/app/components/source-code/source-code.module';
import { InformationModule } from 'src/app/components/information/information.module';


@NgModule({
  declarations: [
    QuickSortComponent,
    QuickSortAnimationComponent,
    QuickSortInputComponent
  ],
    imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SourceCodeModule,
    InformationModule
]
})
export class QuickSortModule {
}
