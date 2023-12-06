import { Component, IterableDiffers, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //Sets en as default lang and gets the local browser lang
  defaultLanguage = 'en';
  locale = this.translate.getBrowserLang() || '';
  isSidebarHidden = true;

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
    this.isSidebarHidden = false;
  }

  handleLanguageChange(lang: string): void {
    this.translate.use(lang);
  }

  test(): void {
    let arr = [2, 1, 3, 0, 12, -7];
  }
}
