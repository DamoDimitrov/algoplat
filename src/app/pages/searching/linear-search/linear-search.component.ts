import { Component, ViewChild } from '@angular/core';
import { SortDataModel } from '../../sorting/shared/models/SortDataModel';
import { LinearSearchAnimationComponent } from './animation/linear-search-animation.component';
import { SearchDataModel } from '../../sorting/shared/models/SearchDataModel';

@Component({
  selector: 'app-linear-search',
  templateUrl: './linear-search.component.html',
  styleUrl: './linear-search.component.scss'
})
export class LinearSearchComponent {
  algoInformation;

  @ViewChild('animationComponent')
  animationComponent: LinearSearchAnimationComponent;

  constructor() {}

  ngOnInit() {
    this.algoInformation = history.state;
  }

  handleInputDataEmitted(data: SearchDataModel) {
    this.animationComponent.searchData = data;
    this.animationComponent.drawData();
  }
}
