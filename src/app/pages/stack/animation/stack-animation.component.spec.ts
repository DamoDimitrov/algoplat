import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackAnimationComponent } from './stack-animation.component';

describe('AnimationComponent', () => {
  let component: StackAnimationComponent;
  let fixture: ComponentFixture<StackAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
