import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynCardComponent } from './card.component';

describe('DynCardComponent', () => {
  let component: DynCardComponent;
  let fixture: ComponentFixture<DynCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
