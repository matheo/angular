import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
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
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
      },
    },
  ],
})
export class DemoFormsModule {}
