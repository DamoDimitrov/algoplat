import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'user-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
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
