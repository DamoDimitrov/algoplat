import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  dataForm = this.fb.group({
    data: new FormControl(''),
  });

  constructor(private fb: FormBuilder) {}

  getUserData(): void {
    console.log(this.dataForm.value.data);
  }
}
