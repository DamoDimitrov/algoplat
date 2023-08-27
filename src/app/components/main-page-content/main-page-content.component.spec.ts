import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageContentComponent } from './main-page-content.component';

describe('MainPageContentComponent', () => {
  let component: MainPageContentComponent;
  let fixture: ComponentFixture<MainPageContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageContentComponent]
    });
    fixture = TestBed.createComponent(MainPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
