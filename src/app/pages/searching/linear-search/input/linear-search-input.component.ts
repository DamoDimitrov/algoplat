import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperFunctions} from "../../../../utils/HelperFunctions";
import { SearchDataModel } from 'src/app/pages/sorting/shared/models/SearchDataModel';

@Component({
  selector: 'linear-search-input',
  templateUrl: './linear-search-input.component.html',
  styleUrl: './linear-search-input.component.scss'
})
export class LinearSearchInputComponent {

  form: FormGroup;
  @Output()
  inputDataEmitter = new EventEmitter();
  formattedData: SearchDataModel;

  constructor(private fb: FormBuilder) {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.fb.group({
      inputData: new FormControl(''),
      searchedData: new FormControl(''),
    })
  }

  getData(): void {
    const dataToSort = this.form.controls['inputData'].value;
    const searchedData = this.form.controls['searchedData'].value;
    let formattedDataToSort = [];
    if (dataToSort.trim().length !== 0 && searchedData !== '') {
      formattedDataToSort = HelperFunctions.getNumbersFromData(dataToSort);
    }

    if (formattedDataToSort.length !== 0) {
      if (this.validateInputNumbers(formattedDataToSort)) {
        this.formattedData = new SearchDataModel();
        this.formattedData.data = formattedDataToSort;
        this.formattedData.searchedData = searchedData;

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
