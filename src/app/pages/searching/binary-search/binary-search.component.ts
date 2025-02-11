import { Component, ViewChild } from '@angular/core';
import { BinarySearchAnimationComponent } from './animation/binary-search-animation.component';
import { SearchDataModel } from '../../sorting/shared/models/SearchDataModel';

@Component({
  selector: 'app-binary-search',
  templateUrl: './binary-search.component.html',
  styleUrl: './binary-search.component.scss'
})
export class BinarySearchComponent {
algoInformation;

  @ViewChild('animationComponent')
  animationComponent: BinarySearchAnimationComponent;

  constructor() {}

  ngOnInit() {
    this.algoInformation = history.state;
  }

  handleInputDataEmitted(data: SearchDataModel) {
    this.animationComponent.searchData = data;
    this.animationComponent.drawData();
  }
}
