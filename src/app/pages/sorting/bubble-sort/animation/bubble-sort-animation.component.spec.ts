import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleSortAnimationComponent } from './bubble-sort-animation.component';

describe('BubbleSortAnimationComponent', () => {
  let component: BubbleSortAnimationComponent;
  let fixture: ComponentFixture<BubbleSortAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleSortAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BubbleSortAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
