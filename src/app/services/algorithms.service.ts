import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {

  constructor(private translate: TranslateService) {
  }

  getAllCategoriesAndAlgorithms(): Observable<any> {
    return new Observable(observer => {
      this.translate.get('algorithmTypes').subscribe(result => {
        observer.next(result);
        observer.complete();
      })
    });
  }
}
