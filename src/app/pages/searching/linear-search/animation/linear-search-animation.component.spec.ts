import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearSearchAnimationComponent } from './linear-search-animation.component';

describe('LinearSearchAnimationComponent', () => {
  let component: LinearSearchAnimationComponent;
  let fixture: ComponentFixture<LinearSearchAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinearSearchAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinearSearchAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
