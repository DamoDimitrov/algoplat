import { Component, IterableDiffers } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //Sets en as default lang and gets the local browser lang
  defaultLanguage = 'en';
  locale = this.translate.getBrowserLang() || '';

  selectedAlgorithmType: object = {};

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.defaultLanguage);
    this.translate.addLangs(['en', 'bg']);
    this.translate.use(this.locale);
  }

  ngOnInit() {
    this.test();
  }

  handleTypeChange(type: object): void {
    this.selectedAlgorithmType = type;
  }

  handleLanguageChange(lang: string): void {
    console.log('app', lang);

    this.translate.use(lang);
  }

  test(): void {
    let arr = [7, 9, 0, 0, 12, -5, 3, -7];
    console.log('arr un', arr);
    console.log('arr s', this.qs(arr));
  }

  qs(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    let p = arr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] <= p) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...this.qs(left), p, ...this.qs(right)];
  }
}
