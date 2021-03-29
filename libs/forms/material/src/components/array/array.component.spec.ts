import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynArrayComponent } from './array.component';

describe('DynArrayComponent', () => {
  let component: DynArrayComponent;
  let fixture: ComponentFixture<DynArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynArrayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
