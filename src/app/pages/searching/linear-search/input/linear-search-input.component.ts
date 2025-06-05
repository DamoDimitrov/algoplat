import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperFunctions} from "../../../../utils/HelperFunctions";
import { SearchDataModel } from 'src/app/pages/sorting/shared/models/SearchDataModel';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

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

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
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
    } else {
      console.error("Enter data in the fields.")

      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: 'EMPTY_FIELDS_ERROR'}})
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
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: "OUT_OF_BOUNDS_ARRAY_ERROR"}});

      return false;
    } else if(searchedData.length > 1) {
      console.error('Only one number can be searched')
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: "MULTIPLE_SEARCHED_NUMBERS_ERROR"}});

      return false;
    }

    if (data.some(n => n > 99 || n < -99)) {
      console.error('The numbers should be bigger than -99 and smaller than 99');
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: "ARRAY_NUMBER_SIZE_ERROR"}});

      return false;
    } else if (searchedData > 99 || searchedData < -99) {
      console.error('The numbers should be bigger than -99 and smaller than 99');
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: "SEARCHED_NUMBER_SIZE_ERROR"}});

      return false;
    }

    return true;
  }
}
