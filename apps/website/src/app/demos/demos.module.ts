import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@matheo/datepicker';
import { ThemeComponent } from '../shared/layout/theme/theme.component';
import { SharedModule } from '../shared/shared.module';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexComponent,
      },
      {
        path: 'datasource',
        loadChildren: () =>
          import('./submodules/datasource/datasource.module').then(
            (m) => m.DatasourceModule
          ),
      },
      {
        path: 'datepicker',
        component: DatepickerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    SharedModule,
  ],
  declarations: [IndexComponent, DatepickerComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DemosModule {}
