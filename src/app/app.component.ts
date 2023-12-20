import {ChangeDetectorRef, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //Sets en as default lang and gets the local browser lang
  defaultLanguage = 'bg';

  selectedAlgorithmType: object = {};

  constructor(private translate: TranslateService,
              private cdr: ChangeDetectorRef) {
    this.translate.setDefaultLang(this.defaultLanguage);
    this.translate.addLangs(['en', 'bg']);
    this.translate.use(this.defaultLanguage);
  }

  ngOnInit() {
  }

  handleLanguageChange(lang: string): void {
    this.translate.use(lang);
  }
}
