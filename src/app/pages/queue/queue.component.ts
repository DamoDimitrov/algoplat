import {Component, ViewChild} from '@angular/core';
import {QueueAnimationComponent} from "./animation/queue-animation.component";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss'
})
export class QueueComponent {
  algoInformation;
  @ViewChild('animationComponent')

  animationComponent: QueueAnimationComponent;

  ngOnInit() {
    this.algoInformation = history.state;
  }

  handlePushEvent() {
    if (this.animationComponent.activeAnimation === false) {
      this.animationComponent.activeAnimation = true;
      this.animationComponent.drawRectangle();
    }
  }

  handlePopEvent() {
    if (this.animationComponent.activeAnimation === false) {
      this.animationComponent.activeAnimation = true;
      this.animationComponent.popFromQueue();
    }
  }

  handlePeekEvent() {
    if (this.animationComponent.activeAnimation === false) {
      this.animationComponent.peekGoingDown = true;
      this.animationComponent.activeAnimation = true;
      this.animationComponent.peekFromQueue();
    }
  }
}
