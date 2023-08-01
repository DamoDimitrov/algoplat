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

  // typesOfAlgorithms = [
  //   {label:'Sorting', route:'#sorting'},
  //   {label:'Searching', route: '#searching'},
  //   {label:'Recursive', route:'#recursive'},
  //   {label:'Hashing', route:'#hashing'},
  //   {label:'Randomized', route:'#randomized'}
  // ]

  constructor() { }

  ngOnInit(): void {
  }

  typeChangeEvent(event: any) {
    this.emitTypeChange.emit(event);
  }
}
