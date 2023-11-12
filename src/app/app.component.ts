import { Component, IterableDiffers } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';
import { Algorithms } from './common/algorithms';

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
    let arr = [2, 1, 3, 0, 12, -7];
    // console.log('arr un', arr);
    console.log('arr :', Algorithms.fibonacci(4));
  }
}
