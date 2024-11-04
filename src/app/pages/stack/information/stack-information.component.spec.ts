import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackInformationComponent } from './stack-information.component';

describe('InformationComponent', () => {
  let component: StackInformationComponent;
  let fixture: ComponentFixture<StackInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
