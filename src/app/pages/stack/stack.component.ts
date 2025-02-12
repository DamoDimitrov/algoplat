import {Component, ViewChild} from '@angular/core';
import {StackAnimationComponent} from "./animation/stack-animation.component";

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss'
})
export class StackComponent {
  algoInformation;

  @ViewChild('animationComponent')
  animationComponent: StackAnimationComponent;

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
      this.animationComponent.popFromStack();
    }
  }

  handlePeekEvent() {
    if (this.animationComponent.activeAnimation === false) {
      this.animationComponent.peekGoingUp = true;
      this.animationComponent.activeAnimation = true;
      this.animationComponent.peekFromStack();
    }
  }
}
