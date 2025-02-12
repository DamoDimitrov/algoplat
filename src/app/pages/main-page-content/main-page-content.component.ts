import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Subject, takeUntil } from 'rxjs';
import { AlgorithmsService } from 'src/app/services/algorithms.service';

@Component({
  selector: 'app-main-page-content',
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent {
  //Todo add featured algos

  $destroy: Subject<void> = new Subject<void>();

  typesOfAlgorithms;

  constructor(
    private translate: TranslateService,
    private algorithmService: AlgorithmsService
  ) {
  }

  ngOnInit(): void {
    this.fetchAlgorithmTypes();
    this.reFetchAlgoTypesOnLangChange();
  }

  fetchAlgorithmTypes(): void {
    this.algorithmService.getAllCategoriesAndAlgorithms()
      .pipe(takeUntil(this.$destroy))
      .subscribe(result =>
        this.typesOfAlgorithms = result.flatMap(obj => (obj.algorithms || []))
      );
    }
  
    private reFetchAlgoTypesOnLangChange() {
      this.translate.onLangChange
        .pipe(takeUntil(this.$destroy))
        .subscribe(() => {
          this.fetchAlgorithmTypes();
        });
    }
}
