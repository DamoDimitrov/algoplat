import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-main-page-content',
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent {

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  featuredAlgorithms = [
    {
      label: "Quick Sort",
      source: "sorting/quickSort",
      imgSource: 'assets/imgs/Bubble-sort-0.png'
    }, {
      label: "Bubble Sort",
      source: "sorting/bubbleSort",
      imgSource: ''
    }, {
      label: "Sequential Search",
      source: "searching/sequentialSearch",
      imgSource: ''
    }, {
      label: "Binary Search",
      source: "binarySearch",
      imgSource: ''
    }, {
      label: "Array",
      source: "array",
      imgSource: ''
    }, {
      label: "Stack",
      source: "stack",
      imgSource: ''
    }
  ];
}
