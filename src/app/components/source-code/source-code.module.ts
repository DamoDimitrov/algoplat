import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceCodeComponent } from './source-code.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [SourceCodeComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [SourceCodeComponent]
})
export class SourceCodeModule { }
