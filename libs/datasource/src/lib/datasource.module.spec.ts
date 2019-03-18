import { async, TestBed } from '@angular/core/testing';
import { MatDatasourceModule } from './datasource.module';

describe('MatDatasourceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDatasourceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MatDatasourceModule).toBeDefined();
  });
});
