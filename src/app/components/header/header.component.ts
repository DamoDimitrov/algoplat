import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { English } from '../../languages/english';
import { LANGUAGES } from '../../languages/languages';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languages = LANGUAGES;
  typesOfAlgorithms: any;

  @Output()
  emitTypeChange = new EventEmitter();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  fetchAlgorithmTypes(): void {
    this.translate.get('algorithmTypes').subscribe((result) => {
      this.typesOfAlgorithms = result;
    });
  }

  typeChangeEvent(event: any): void {
    this.emitTypeChange.emit(event);
  }
}
