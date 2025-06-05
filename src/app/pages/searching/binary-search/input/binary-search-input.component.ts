import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperFunctions} from "../../../../utils/HelperFunctions";
import { SearchDataModel } from 'src/app/pages/sorting/shared/models/SearchDataModel';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

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

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
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
    let formattedDataToSearch = [];
    let formattedSearchedData;
    if (dataToSort.trim().length !== 0 && searchedData !== '') {
      formattedDataToSearch = HelperFunctions.getNumbersFromData(dataToSort);
      formattedSearchedData = HelperFunctions.getNumbersFromData(searchedData);
    } else {
      console.error("Enter data in the fields.")

      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: 'EMPTY_FIELDS_ERROR'}})
    }

    if (formattedDataToSearch.length !== 0) {
      if (this.validateInputNumbers(formattedDataToSearch, formattedSearchedData)) {
        this.formattedData = new SearchDataModel();
        this.formattedData.data = formattedDataToSearch;
        this.formattedData.searchedData = searchedData;

        this.inputDataEmitter.emit(this.formattedData);
      }
    }
  }

  validateInputNumbers(data: number[], searchedData) {
    if (data.length > 9 || data.length < 1) {
      console.error('The Array is too long or too short');
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: "OUT_OF_BOUNDS_ARRAY_ERROR"}});

      return false;
    } else if(searchedData.length > 1) {
      console.error('Only one number can be searched')
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: "MULTIPLE_SEARCHED_NUMBERS_ERROR"}});

      return false;
    }

    if (data.some(n => n > 99 || n < -99)) {
      console.error('The numbers should be bigger than -99 and smaller than 99');
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: 'ARRAY_NUMBER_SIZE_ERROR'}});

      return false;
    } else if (searchedData > 99 || searchedData < -99) {
      console.error('The numbers should be bigger than -99 and smaller than 99');
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: 'SEARCHED_NUMBER_SIZE_ERROR'}});

      return false;
    }

    if(!this.isSorted(data)) {
      console.error('The array must be sorted')
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: 'UNORDERED_ARRAY_ERROR'}});

      return false;
    }

    return true;
  }

  private isSorted(arr: number[]){
    if (arr.every((val, i, array) => i === 0 || array[i - 1] <= val)) {
      return true;
    } else {
      return false;
    }
  }
}
