import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinarySearchInputComponent } from './binary-search-input.component';

describe('BinarySearchInputComponent', () => {
  let component: BinarySearchInputComponent;
  let fixture: ComponentFixture<BinarySearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinarySearchInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BinarySearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
