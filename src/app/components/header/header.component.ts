import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LANGUAGES} from "../../common/languages";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages = LANGUAGES;
  typesOfAlgorithms: any;

  isRightMenuCollapsed = false;
  isLanguageMenuCollapsed = false;

  // @Output()
  // emitTypeChange = new EventEmitter();
  // @Output()
  // emitLanguageChange = new EventEmitter();

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.fetchAlgorithmTypes();
  }

  fetchAlgorithmTypes(): void {
    this.translate.get('algorithmTypes').subscribe((result) => {
      this.typesOfAlgorithms = result;
    });
  }

  // typeChangeEvent(event: any): void {
  //   this.emitTypeChange.emit(event);
  // }

  // languageChangeEvent(lang: string): void {
  //   this.emitLanguageChange.emit(lang);
  //   console.log('header', lang);
  // }

  changeAlgorithmTypesMenuDisplay() {
    this.onClickHideTypesMenu()
  }

  onClickHideTypesMenu() {
    this.isRightMenuCollapsed = !this.isRightMenuCollapsed;
  }

  onClickToggleLangMenu() {
    this.isLanguageMenuCollapsed = !this.isLanguageMenuCollapsed;
  }
}
