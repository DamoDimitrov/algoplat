import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSortInputComponent } from './quick-sort-input.component';

describe('QuickSortInputComponent', () => {
  let component: QuickSortInputComponent;
  let fixture: ComponentFixture<QuickSortInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickSortInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickSortInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
