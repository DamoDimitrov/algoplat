import { Component, ViewChild } from '@angular/core';
import { SortDataModel } from '../shared/models/SortDataModel';
import { MergeSortAnimationComponent } from './animation/merge-sort-animation.component';

@Component({
  selector: 'app-merge-sort',
  templateUrl: './merge-sort.component.html',
  styleUrl: './merge-sort.component.scss'
})
export class MergeSortComponent {
algoInformation;

  @ViewChild('animationComponent')
  animationComponent: MergeSortAnimationComponent;

  constructor() {}

  ngOnInit() {
    this.algoInformation = history.state;
  }

  handleInputDataEmitted(data: SortDataModel) {
    this.animationComponent.sortData = data;
    this.animationComponent.drawData();
  }
}
