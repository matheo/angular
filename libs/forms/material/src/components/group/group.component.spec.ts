import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynGroupComponent } from './group.component';

describe('DynGroupComponent', () => {
  let component: DynGroupComponent;
  let fixture: ComponentFixture<DynGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
