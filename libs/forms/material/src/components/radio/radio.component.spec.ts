import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynRadioComponent } from './radio.component';

describe('DynRadioComponent', () => {
  let component: DynRadioComponent;
  let fixture: ComponentFixture<DynRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynRadioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
