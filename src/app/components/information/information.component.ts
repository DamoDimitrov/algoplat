import { Component, Input } from '@angular/core';

@Component({
  selector: 'information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  @Input()
  algoInformation;
}
