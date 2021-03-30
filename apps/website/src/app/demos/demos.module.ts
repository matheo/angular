import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule, NativeDateModule } from '@matheo/datepicker';
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
        path: 'dyn-forms',
        loadChildren: () =>
          import('./submodules/dyn-forms/dyn-forms.module').then(
            (m) => m.DemoFormsModule
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
    NativeDateModule,
    SharedModule,
  ],
  declarations: [IndexComponent, DatepickerComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: null,
          datetimeInput: null,
          timeInput: null,
          monthInput: null,
          yearInput: null,
        },
        display: {
          dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
          datetimeInput: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          },
          timeInput: { hour: 'numeric', minute: 'numeric', hour12: false },
          monthInput: { month: 'short', year: 'numeric' },
          yearInput: { year: 'numeric' },
          dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
          monthLabel: { month: 'short' },
          monthDayLabel: { month: 'short', day: 'numeric' },
          monthDayA11yLabel: { month: 'long', day: 'numeric' },
          monthYearLabel: { year: 'numeric', month: 'short' },
          monthYearA11yLabel: { year: 'numeric', month: 'long' },
          timeLabel: { hours: 'numeric', minutes: 'numeric', hour12: false },
        },
      },
    },
  ],
})
export class DemosModule {}
