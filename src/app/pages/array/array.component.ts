import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrl: './array.component.scss'
})
export class ArrayComponent {
  @ViewChild('animationComponent')
  animationComponent

  arrayData: number[] = [];
  numberToSetData = {number: null, index: null};


  handleGetArray(arr) {
    this.arrayData = arr;
  }

  handleSetValueByIndex(data) {
    if (!this.animationComponent.activeAnimation) {
      this.animationComponent.activeAnimation = true;
      this.numberToSetData = data;
    }
  }
}
