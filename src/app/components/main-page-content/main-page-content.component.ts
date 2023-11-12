import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { Algorithms } from 'src/app/common/algorithms';

@Component({
  selector: 'app-main-page-content',
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent {
  @ViewChild('canvas') canvas!: ElementRef;

  input: number[] = [7, 9, 0, 0, 12, -5, 3, -7];
  result: any[] = [-7, -5, 0, 0, 3, 7, 12];

  count = this.input.length;

  ngAfterViewInit(): void {
    const c = this.canvas.nativeElement.getContext('2d');

    //creates rectangle
  }

  handleUserData(data: String): void {
    let formatedData = data.split(/,\s*/).map((e) => parseInt(e));
    this.input = formatedData;
    this.result = Algorithms.quickSort(formatedData);
  }
}

export class Rectancle {
  constructor(
    private x: number,
    private y: number,
    private w: number,
    private h: number,
    private number: number
  ) {}

  draw(c) {
    c.fillStyle = 'rgba(121, 63, 255, 0.8)';

    c.fillRect(this.x, this.y - 100, this.w, this.h);
    c.fillRect(112, 20, 8, 112);
    // c.fillText(this.number, 27, 48);
  }
}
