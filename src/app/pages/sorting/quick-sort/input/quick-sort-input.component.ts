import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperFunctions} from "../../../../utils/HelperFunctions";
import {SortDataModel} from "../../shared/models/SortDataModel";
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'quick-sort-input',
  templateUrl: './quick-sort-input.component.html',
  styleUrl: './quick-sort-input.component.scss'
})
export class QuickSortInputComponent {

  form: FormGroup;
  @Output()
  inputDataEmitter = new EventEmitter();
  formattedData: SortDataModel;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
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
    } else {
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: 'OUT_OF_BOUNDS_ARRAY_ERROR'}});
    }

  }

  validateInputNumbers(data: number[]) {
    if (data.length > 9 || data.length < 1) {
      console.error('The Array is too long or too short');
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: 'OUT_OF_BOUNDS_ARRAY_ERROR'}});

      return false;
    }

    if (data.some(n => n > 99 || n < -99)) {
      console.error('The numbers should be bigger than -99 and smaller than 99');
      this.dialog.open(ErrorDialogComponent, {data: {errorMsg: 'ARRAY_NUMBER_SIZE_ERROR'}});

      return false;
    }

    return true;
  }
}
