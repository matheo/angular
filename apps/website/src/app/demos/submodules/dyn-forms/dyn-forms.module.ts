import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynFormsModule } from '@matheo/dyn-forms';
import { DynFormsMaterialModule } from '@matheo/dyn-forms/material';
import { SharedModule } from '../../../shared/shared.module';
import { SimpleComponent } from './components/simple/simple.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DynFormsModule,
    DynFormsMaterialModule.forFeature(),
    SharedModule,
  ],
  declarations: [SimpleComponent],
})
export class DemoFormsModule {}
