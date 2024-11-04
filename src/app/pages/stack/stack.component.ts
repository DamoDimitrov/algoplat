import {Component, ViewChild} from '@angular/core';
<<<<<<< Updated upstream
import {AnimationComponent} from "./animation/animation.component";
=======
import {StackAnimationComponent} from "./animation/stack-animation.component";
>>>>>>> Stashed changes

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss'
})
export class StackComponent {
  @ViewChild('animationComponent')
<<<<<<< Updated upstream
  animationComponent: AnimationComponent;
=======
  animationComponent: StackAnimationComponent;
>>>>>>> Stashed changes

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
