import { Component, OnInit } from '@angular/core';
import {ENGLISH} from "../../common/English";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerTitle = ENGLISH.HEADER_TITLE;

  typesOfAlgorithms = [
    {label:'Sorting', route:'#sorting'},
    {label:'Searching', route: '#searching'},
    {label:'Recursive', route:'#recursive'},
    {label:'Hashing', route:'#hashing'},
    {label:'Randomized', route:'#randomized'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
