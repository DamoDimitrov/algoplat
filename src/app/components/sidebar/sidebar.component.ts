import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input()
  selectedAlgorithmType: any = {};

  algorithms: any[];
  @Input()
  isHidden = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    console.log(this.selectedAlgorithmType)
    this.algorithms = this.selectedAlgorithmType.algorithms;
  }
}
