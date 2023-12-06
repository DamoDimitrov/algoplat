import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input()
  input: any[] = [];

  @Input()
  result: number[] = [];

  @Output()
  submitData = new EventEmitter();

  dataForm = this.fb.group({
    data: new FormControl(''),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submitUserData(): void {
    this.submitData.emit(this.dataForm.value.data);
  }
}
