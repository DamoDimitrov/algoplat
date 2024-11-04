import {Component, inject, ViewChild} from '@angular/core';
import {QuickSortAnimationComponent} from "../shared/animation/quick-sort-animation.component";
import {SortDataModel} from "../shared/models/SortDataModel";

@Component({
  selector: 'app-quick-sort',
  templateUrl: './quick-sort.component.html',
  styleUrl: './quick-sort.component.scss'
})
export class QuickSortComponent {
  algoInformation;

  @ViewChild('animationComponent')
  animationComponent: QuickSortAnimationComponent;

  constructor() {}

  ngOnInit() {
    this.algoInformation = history.state;
  }

  handleInputDataEmitted(data: SortDataModel) {
    this.animationComponent.sortData = data;
    this.animationComponent.drawData();
  }

}
