import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackTabsWindowComponent } from './stack-tabs-window.component';

describe('TabsWindowComponent', () => {
  let component: StackTabsWindowComponent;
  let fixture: ComponentFixture<StackTabsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackTabsWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackTabsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
