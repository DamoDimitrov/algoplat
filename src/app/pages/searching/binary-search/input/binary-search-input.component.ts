import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperFunctions} from "../../../../utils/HelperFunctions";
import { SearchDataModel } from 'src/app/pages/sorting/shared/models/SearchDataModel';

@Component({
  selector: 'binary-search-input',
  templateUrl: './binary-search-input.component.html',
  styleUrl: './binary-search-input.component.scss'
})
export class BinarySearchInputComponent {

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
    const dataToSearch = this.form.controls['inputData'].value;
    const searchedData = this.form.controls['searchedData'].value;
    let formattedDataToSearch = [];
    if (dataToSearch.trim().length !== 0 && searchedData !== '') {
      formattedDataToSearch = HelperFunctions.getNumbersFromData(dataToSearch);
    }

    if (formattedDataToSearch.length !== 0) {
      if (this.validateInputNumbers(formattedDataToSearch) && this.isSorted(formattedDataToSearch)) {
        this.formattedData = new SearchDataModel();
        this.formattedData.data = formattedDataToSearch;
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

  private isSorted(arr: number[]){
    if (arr.every((val, i, array) => i === 0 || array[i - 1] <= val)) {
      return true;
    } else {
      console.error('The array must be sorted')
      return false;
    }
  }
}
