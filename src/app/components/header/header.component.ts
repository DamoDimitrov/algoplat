import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LANGUAGES} from "../../common/languages";
import {AlgorithmsService} from "../../services/algorithms.service";
import {Subject, takeUntil} from "rxjs";

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

  @Output()
  emitLanguageChange = new EventEmitter();

  $destroy: Subject<void> = new Subject<void>();

  constructor(private translate: TranslateService,
              private algorithmService: AlgorithmsService) {

  }

  ngOnInit(): void {
    this.fetchAlgorithmTypes();
    this.reFetchAlgoTypesOnLangChange();
  }

  fetchAlgorithmTypes(): void {
    this.algorithmService.getAllCategoriesAndAlgorithms()
      .pipe(takeUntil(this.$destroy))
      .subscribe(result =>
        this.typesOfAlgorithms = result
      );
  }

  languageChangeEvent(lang: string): void {
    this.emitLanguageChange.emit(lang);
  }

  onClickToggleTypesMenu() {
    this.isRightMenuCollapsed = !this.isRightMenuCollapsed;
  }

  onClickToggleLangMenu() {
    this.isLanguageMenuCollapsed = !this.isLanguageMenuCollapsed;
  }

  toggleAlgorithmsByCategoryMenu(div) {
    const arrowElement = div.getElementsByClassName('arrow')[0];
    const algoDropdown = div.getElementsByClassName('algo-type-dropdown')[0];
    if (window.innerWidth <= 786) {
      this.rotateAlgorithmsSubmenuArrow(arrowElement);
      this.toggleAlgorithmsSubmenu(algoDropdown, div);
    }
  }

  private toggleAlgorithmsSubmenu(dropdown, div) {
    if (dropdown.classList.contains('show')) {
      div.classList.remove('active-category')
      dropdown.classList.remove('show');
      return;
    }
    dropdown.classList.add('show');
    div.classList.add('active-category')
  }

  private rotateAlgorithmsSubmenuArrow(i) {
    if (i.classList.contains('right')) {
      i.classList.replace('right', 'down');
      return;
    }
    i.classList.replace('down', 'right');
  }

  private reFetchAlgoTypesOnLangChange() {
    this.translate.onLangChange
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.fetchAlgorithmTypes();
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
