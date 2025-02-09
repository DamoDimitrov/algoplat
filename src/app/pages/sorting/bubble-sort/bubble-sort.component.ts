import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortDataModel } from '../shared/models/SortDataModel';
import { BubbleSortAnimationComponent } from './animation/bubble-sort-animation.component';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrl: './bubble-sort.component.scss'
})
export class BubbleSortComponent {
  algoInformation;

  @ViewChild('animationComponent')
  animationComponent: BubbleSortAnimationComponent;

  constructor() {}

  ngOnInit() {
    this.algoInformation = history.state;
  }

  handleInputDataEmitted(data: SortDataModel) {
    this.animationComponent.sortData = data;
    this.animationComponent.drawData();
  }
}
