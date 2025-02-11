import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinarySearchAnimationComponent } from './binary-search-animation.component';

describe('BinarySearchAnimationComponent', () => {
  let component: BinarySearchAnimationComponent;
  let fixture: ComponentFixture<BinarySearchAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinarySearchAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BinarySearchAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
