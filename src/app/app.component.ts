import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  selectedLanguage = '';

  selectedAlgorithmType: object = {}

  ngOnInit() {
  }

  handleTypeChange(type: any) {
    console.log('root', type)
    this.selectedAlgorithmType = type;
  }
}
