import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'user-input',
  templateUrl: './array-input.component.html',
  styleUrl: './array-input.component.scss'
})
export class ArrayInputComponent {

  @Output()
  getArrayEmitter = new EventEmitter();
  @Output()
  setValueByIndexEmitter = new EventEmitter();

  isArrayCreated = false;
  isCreationTypeData = true;
  numbersArray: number[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createFormGroup()
  }

  createFormGroup() {
    this.form = this.fb.group({
      formData: this.fb.group({
        arrayData: new FormControl(''),
        arraySize: new FormControl(0)
      }),
      dataManipulation: this.fb.group({
        valueToSet: new FormControl(''),
        indexToSet: undefined,
        disabled: true})
    })
  }

  getArray(): void {
    if (this.isCreationTypeData) {
      let data = this.form.get('formData').get('arrayData').value;

      if (data !== null && data.trim() === '') {
        console.error('Array data is Empty.')
        return;
      } else {
        this.numbersArray = this.getNumbersFromData(data);
      }

      if (this.numbersArray.length > 8 || this.numbersArray.length < 1) {
        console.error('Array length exceeding 8 numbers or less than 1.', this.numbersArray)
        return;
      }
    } else {
      let size = this.form.get('formData').get('arraySize').value;

      if (size < 1 || size > 8) {
        console.error('Array size is less than 1 or exceeding 8.');
        return;
      } else {
        this.numbersArray = new Array<number>(size);
      }
    }

    this.enableSetByIndexFields();

    this.getArrayEmitter.emit(this.numbersArray);
    this.form.get('formData').reset();
  }

  setValue(): void {
    let value = this.form.get('dataManipulation').get('valueToSet').value;
    let index = this.form.get('dataManipulation').get('indexToSet').value;
    let parsedValue;
    let parsedIndex;
    if (value !== '' && index !== null) {
      parsedValue = this.getNumbersFromData(value)[0];
      parsedIndex = this.getNumbersFromData(index)[0];
    } else {
      console.error('Not enough data');
      return;
    }

    parsedValue.some()

    if (parsedIndex < 0 || parsedIndex > this.numbersArray.length - 1) {
      console.error('Error')
      return;
    }

    this.setValueByIndexEmitter.emit({value: parsedValue, index: parsedIndex})
    this.numbersArray[parsedIndex] = parsedValue;
  }

  getNumbersFromData(inputString: string): number[] {
    const regex = /-?\d+/g;
    const matches = inputString.match(regex);
    if (matches) {
      return matches.map(match => parseInt(match, 10));
    }
    return [];
  }

  changeCreationType() {
    if (this.isCreationTypeData) {
      this.form.get('formData').get('arraySize').setValue(0);
    } else {
      this.form.get('formData').get('arrayData').setValue('');
    }
    this.isCreationTypeData = !this.isCreationTypeData;
    //Disabling the fields
    this.form.get('dataManipulation').disable();
    //Disabling the button
    this.isArrayCreated = false;
  }

  enableSetByIndexFields() {
    this.isArrayCreated = true;
    this.form.get('dataManipulation').enable();
  }
}
