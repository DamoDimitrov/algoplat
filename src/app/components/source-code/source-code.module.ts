import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceCodeComponent } from './source-code.component';



@NgModule({
  declarations: [SourceCodeComponent],
  imports: [
    CommonModule
  ],
  exports: [SourceCodeComponent]
})
export class SourceCodeModule { }
