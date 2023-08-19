import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {English} from "../../languages/english";
import {LANGUAGES} from "../../languages/languages";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerTitle = English.HEADER_TITLE;
  languages = LANGUAGES;

  @Output()
  emitTypeChange = new EventEmitter();

  typesOfAlgorithms = English.algorithmTypes;

  constructor() { }

  ngOnInit(): void {
  }

  typeChangeEvent(event: any) {
    this.emitTypeChange.emit(event);
  }
}
