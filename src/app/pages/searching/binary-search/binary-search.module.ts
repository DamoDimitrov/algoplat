import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinarySearchComponent } from './binary-search.component';
import { BinarySearchInputComponent } from './input/binary-search-input.component';
import { BinarySearchAnimationComponent } from './animation/binary-search-animation.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SourceCodeModule } from 'src/app/components/source-code/source-code.module';
import { InformationModule } from 'src/app/components/information/information.module';



@NgModule({
  declarations: [
    BinarySearchComponent,
    BinarySearchInputComponent,
    BinarySearchAnimationComponent
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
export class BinarySearchModule { }
