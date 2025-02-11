import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperFunctions} from "../../../../utils/HelperFunctions";
import {SortDataModel} from "../../shared/models/SortDataModel";

@Component({
  selector: 'merge-sort-input',
  templateUrl: './merge-sort-input.component.html',
  styleUrl: './merge-sort-input.component.scss'
})
export class MergeSortInputComponent {

  form: FormGroup;
  @Output()
  inputDataEmitter = new EventEmitter();
  formattedData: SortDataModel;

  constructor(private fb: FormBuilder) {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.fb.group({
      inputData: new FormControl(''),
      sortType: new FormControl('ASC')
    })
  }

  getData(): void {
    const dataToSort = this.form.controls['inputData'].value;
    const sortType = this.form.controls['sortType'].value;
    let formattedDataToSort = [];
    if (dataToSort.trim().length !== 0 && sortType !== '') {
      formattedDataToSort = HelperFunctions.getNumbersFromData(dataToSort);
    }

    if (formattedDataToSort.length !== 0) {
      if (this.validateInputNumbers(formattedDataToSort)) {
        this.formattedData = new SortDataModel();
        this.formattedData.data = formattedDataToSort;
        this.formattedData.sortType = sortType;

        this.inputDataEmitter.emit(this.formattedData);
      }
    }

  }

  validateInputNumbers(data: number[]) {
    if (data.length > 9 || data.length < 2) {
      console.error('The Array is too long or too short');
      return false;
    }

    if (data.some(n => n > 9 || n < -9)) {
      console.error('The numbers should be bigger than -9 and smaller than 9');
      return false;
    }

    return true;
  }
}
