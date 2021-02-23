import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MatDataSourceModule } from '@matheo/datasource';
import { SharedModule } from '../../../shared/shared.module';
import { ListFilterComponent } from './components/list-filter/list-filter.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp({
      projectId: 'matdatasource',
      databaseURL: 'https://matdatasource.firebaseio.com',
    }),
    RouterModule.forChild(routes),
    MatDataSourceModule,
    SharedModule,
  ],
  declarations: [ListComponent, ListFilterComponent, ListTableComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DatasourceModule {}
