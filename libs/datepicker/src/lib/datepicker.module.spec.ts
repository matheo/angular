import { async, TestBed } from '@angular/core/testing';
import { MatDatepickerModule } from './datepicker.module';

describe('MatDatepickerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDatepickerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MatDatepickerModule).toBeDefined();
  });
});
