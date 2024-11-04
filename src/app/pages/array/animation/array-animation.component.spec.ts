import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayAnimationComponent } from './array-animation.component';

describe('AnimationComponent', () => {
  let component: ArrayAnimationComponent;
  let fixture: ComponentFixture<ArrayAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
