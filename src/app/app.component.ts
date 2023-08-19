import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
    this.translate.use(this.locale);
  }

  ngOnInit() {}

  handleTypeChange(type: any): void {
    this.selectedAlgorithmType = type;
  }

  handleLanguageChange(lang: string): void {
    this.translate.use(lang);
  }
}
