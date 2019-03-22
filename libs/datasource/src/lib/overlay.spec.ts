import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { MatDataSource } from './datasource';
import { DataSourceOverlay } from './overlay';
import {
  DataSourceEmpty,
  DataSourceError,
  DataSourceLoading
} from './directives';

class DataSource extends MatDataSource<any, any, any> {
  rawDefault() {
    return { data: [] };
  }
  rawFetch(args: { data?: any }) {
    return !args.data ? throwError({}) : of(args);
  }
  rawResult(result: any) {
    return result.data || [];
  }
  rawTotal(result: Array<any>) {
    return of(result.length);
  }
}

describe('DataSourceOverlay', () => {
  const stream = new BehaviorSubject<any>({ data: [] });

  // TODO test errors and different kind of dataSource events
  const dataSource = new DataSource();
  dataSource.addOptional({
    stream,
    getter: () => stream.getValue()
  });
  dataSource.connect();

  let component: DataSourceOverlay<any, any, any>;
  let fixture: ComponentFixture<DataSourceOverlay<any, any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [
        DataSourceEmpty,
        DataSourceError,
        DataSourceLoading,
        DataSourceOverlay
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceOverlay);
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    component.diameter = 40;
    component.strokeWidth = 5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error', () => {
    stream.next({});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should list', () => {
    stream.next({ data: ['NOT_EMPTY'] });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should disconnect', () => {
    dataSource.disconnect();
    expect(component).toBeTruthy();
  });
});
