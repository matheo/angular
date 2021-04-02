import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { DynFormsMaterialModule } from '@myndpm/dyn-forms/material';
import { SharedModule } from '../../../shared/shared.module';
import { SimpleComponent } from './components/simple/simple.component';
import { Step1Component } from './components/stepper/step1/step1.component';
import { Step2Component } from './components/stepper/step2/step2.component';
import { Step3Component } from './components/stepper/step3/step3.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SummaryComponent } from './components/stepper/summary/summary.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'simple-form',
  },
  {
    path: 'simple-form',
    component: SimpleComponent,
  },
  {
    path: 'stepper-form',
    component: StepperComponent,
    children: [
      {
        path: 'step-1',
        component: Step1Component,
      },
      {
        path: 'step-2',
        component: Step2Component,
      },
      {
        path: 'step-3',
        component: Step3Component,
      },
      {
        path: 'summary',
        component: SummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DynFormsMaterialModule.forFeature(),
    SharedModule,
  ],
  declarations: [
    SimpleComponent,
    StepperComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    SummaryComponent,
  ],
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
