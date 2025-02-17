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
    const dataToSort = this.form.controls['inputData'].value;
    const searchedData = this.form.controls['searchedData'].value;
    let formattedDataToSort = [];
    let formattedSearchedDataToSort;
    if (dataToSort.trim().length !== 0 && searchedData !== '') {
      formattedDataToSort = HelperFunctions.getNumbersFromData(dataToSort);
      formattedSearchedDataToSort = HelperFunctions.getNumbersFromData(searchedData);
    }

    if (formattedDataToSort.length !== 0) {
      if (this.validateInputNumbers(formattedDataToSort, formattedSearchedDataToSort)) {
        this.formattedData = new SearchDataModel();
        this.formattedData.data = formattedDataToSort;
        this.formattedData.searchedData = searchedData;

        this.inputDataEmitter.emit(this.formattedData);
      }
    }
  }

  validateInputNumbers(data: number[], searchedData) {
    if (data.length > 9 || data.length < 1) {
      console.error('The Array is too long or too short');
      return false;
    } else if(searchedData.length > 1) {
      console.log('Only one number can be searched')
      return false;
    }

    if (data.some(n => n > 99 || n < -99)) {
      console.error('The numbers should be bigger than -99 and smaller than 99');
      return false;
    } else if (searchedData > 99 || searchedData < -99) {
      console.error('The numbers should be bigger than -99 and smaller than 99');
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
