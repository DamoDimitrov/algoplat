import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearSearchComponent } from './linear-search.component';
import { LinearSearchAnimationComponent } from './animation/linear-search-animation.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinearSearchInputComponent } from './input/linear-search-input.component';
import { SourceCodeModule } from 'src/app/components/source-code/source-code.module';
import { InformationModule } from 'src/app/components/information/information.module';



@NgModule({
  declarations: [
    LinearSearchComponent,
    LinearSearchAnimationComponent,
    LinearSearchInputComponent
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
export class LinearSearchModule { }
