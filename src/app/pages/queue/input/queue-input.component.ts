import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'queue-user-input',
  templateUrl: './queue-input.component.html',
  styleUrl: './queue-input.component.scss',
})
export class QueueInputComponent {
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
