import {Component, Input } from '@angular/core';

@Component({
  selector: 'source-code',
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.scss'
})
export class SourceCodeComponent {

  @Input()
  sourceCode: string;

  get formattedSourceCode(): string {
    return this.sourceCode.replace(/\\n/g, '\n');
  }

  ngOnInit() {
    console.log(this.sourceCode);
  }
}
