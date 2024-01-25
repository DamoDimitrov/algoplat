import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnimationComponent} from "./animation/animation.component";

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss'
})
export class StackComponent {
  @ViewChild('animationComponent')
  animationComponent: AnimationComponent;

  handlePushEvent() {
    console.log(this.animationComponent.activeAnimation)
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
