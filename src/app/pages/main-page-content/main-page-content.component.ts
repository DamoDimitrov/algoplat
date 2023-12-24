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
      source: "quicksort",
      imgSource: 'src/assets/imgs/Bubble-sort-0.png'
    }, {
      label: "Bubble Sort",
      source: "bubblesort",
      imgSource: ''
    }, {
      label: "Sequential Search",
      source: "sequentialsearch",
      imgSource: ''
    }, {
      label: "Fibonacci Sequence",
      source: "fibonaccisequence",
      imgSource: ''
    }, {
      label: "Fibonacci Sequence",
      source: "fibonaccisequence",
      imgSource: ''
    }, {
      label: "Fibonacci Sequence",
      source: "fibonaccisequence",
      imgSource: ''
    }
  ];
}
