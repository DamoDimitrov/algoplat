import {Component} from '@angular/core';

@Component({
  selector: 'app-main-page-content',
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent {
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
    }
  ];
}
