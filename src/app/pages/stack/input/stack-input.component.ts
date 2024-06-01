import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'user-input',
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss'
})
export class StackInputComponent {
  @Output()
  pushBtnEventEmitter = new EventEmitter();
  @Output()
  popBtnEventEmitter = new EventEmitter();
  @Output()
  peekBtnEventEmitter = new EventEmitter();

  pushBtnClicked() {
    this.pushBtnEventEmitter.emit();
  }

  popBtnClicked() {
    this.popBtnEventEmitter.emit();
  }

  peekBtnClicked() {
    this.peekBtnEventEmitter.emit();
  }
}
