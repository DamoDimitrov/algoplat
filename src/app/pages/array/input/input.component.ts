import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'user-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  arrayData = '';
  arraySize = 0;

  creationTypeData = true;
  creationTypeSize = false;

  numbersArray: number[];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // this.createFormGroup()
  }

  // createFormGroup() {
  //   this.fb.group({
  //     arrayData: new FormControl(''),
  //     arraySize: new FormControl(0)
  //   })
  // }

  createArray(): void {
    if (this.creationTypeData) {
      this.numbersArray = this.getNumbersFromData(this.arrayData);
    } else if (this.creationTypeSize) {
      this.numbersArray = new Array<number>(this.arraySize)
    }

    if (this.numbersArray.length > 8 || this.arraySize > 8) {
      console.log('Array should be max size 8')
      return;
    }


    console.log(this.numbersArray)

  }

  setValue(value: string, index: string): void {
    let parsedValue = this.getNumbersFromData(value);
    let parsedIndex = this.getNumbersFromData(index);

    if (parsedIndex.length > 1 || parsedValue.length > 1) {
      return;
    }
  }

  getNumbersFromData(inputString: string): number[] {
    const regex = /\d+/g;
    const matches = inputString.match(regex);
    if (matches) {
      return matches.map(match => parseInt(match, 10));
    }
    return [];
  }

  changeCreationTypeToData() {
    this.arraySize = 0;
    this.creationTypeData = true;
    this.creationTypeSize = false;
  }

  changeCreationTypeToSize() {
    this.arrayData = '';
    this.creationTypeData = false;
    this.creationTypeSize = true;
  }
}
