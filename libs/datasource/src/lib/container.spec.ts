import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { of } from 'rxjs';
import { DataSourceContainer } from './container';
import { MatDataSource } from './datasource';
import {
  DataSourceEmpty,
  DataSourceError,
  DataSourceLoading
} from './directives';
import { DataSourceOverlay } from './overlay';

class DataSource extends MatDataSource<any, any, any> {
  rawDefault() {
    return {};
  }
  rawFetch(args: any) {
    return of({});
  }
  rawResult(result: any) {
    return [];
  }
  rawTotal(result: any) {
    return of(0);
  }
}

describe('DataSourceContainer', () => {
  let component: DataSourceContainer<any, any, any>;
  let fixture: ComponentFixture<DataSourceContainer<any, any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [
        DataSourceEmpty,
        DataSourceError,
        DataSourceLoading,
        DataSourceOverlay,
        DataSourceContainer
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceContainer);
    component = fixture.componentInstance;
    component.dataSource = new DataSource();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
