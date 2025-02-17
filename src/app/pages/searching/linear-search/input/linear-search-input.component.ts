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
}
