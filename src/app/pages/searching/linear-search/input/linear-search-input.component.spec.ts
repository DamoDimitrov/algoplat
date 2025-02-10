import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearSearchInputComponent } from './linear-search-input.component';

describe('LinearSearchInputComponent', () => {
  let component: LinearSearchInputComponent;
  let fixture: ComponentFixture<LinearSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinearSearchInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinearSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
