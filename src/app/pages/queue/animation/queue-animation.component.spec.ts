import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueAnimationComponent } from './queue-animation.component';

describe('AnimationComponent', () => {
  let component: QueueAnimationComponent;
  let fixture: ComponentFixture<QueueAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
