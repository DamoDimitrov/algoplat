import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsWindowComponent } from './tabs-window.component';

describe('TabsWindowComponent', () => {
  let component: TabsWindowComponent;
  let fixture: ComponentFixture<TabsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
