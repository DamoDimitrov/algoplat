import { Component } from '@angular/core';
import {LANGUAGES} from "./languages/languages";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  selectedLanguage = '';
  languages = LANGUAGES;

  ngOnInit() {
    console.log(this.languages);
  }
}
