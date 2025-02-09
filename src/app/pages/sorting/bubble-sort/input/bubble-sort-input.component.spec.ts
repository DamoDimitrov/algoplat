import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleSortInputComponent } from './bubble-sort-input.component';

describe('QuickSortInputComponent', () => {
  let component: BubbleSortInputComponent;
  let fixture: ComponentFixture<BubbleSortInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleSortInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BubbleSortInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
