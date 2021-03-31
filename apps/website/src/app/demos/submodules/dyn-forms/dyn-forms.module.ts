import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { DynFormsMaterialModule } from '@myndpm/dyn-forms/material';
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
    DynFormsMaterialModule.forFeature(),
    SharedModule,
  ],
  declarations: [SimpleComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard',
        hideRequiredMarker: true,
        floatLabel: 'never',
      },
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DemoFormsModule {}
