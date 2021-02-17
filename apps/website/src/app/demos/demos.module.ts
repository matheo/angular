import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@matheo/datepicker';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'datepicker',
        component: DatepickerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    SharedModule,
  ],
  declarations: [IndexComponent, DatepickerComponent],
})
export class DemosModule {}
