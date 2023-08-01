import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input()
  selectedAlgorithmType: any = {};

  algorithms: any[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.selectedAlgorithmType.label)
  }

  ngOnChanges() {
    this.algorithms = this.selectedAlgorithmType.algorithms;
    console.log(this.algorithms);
  }

}
