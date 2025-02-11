import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeSortAnimationComponent } from './merge-sort-animation.component';

describe('MergeSortAnimationComponent', () => {
  let component: MergeSortAnimationComponent;
  let fixture: ComponentFixture<MergeSortAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeSortAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MergeSortAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
