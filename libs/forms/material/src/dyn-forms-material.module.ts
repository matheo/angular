import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DynFormsModule } from '@matheo/dyn-forms';
import { DynArrayComponent } from './components/array/array.component';
import { DynCardComponent } from './components/card/card.component';
import { DynGroupComponent } from './components/group/group.component';
import { DynInputComponent } from './components/input/input.component';
import { DynRadioComponent } from './components/radio/radio.component';
import { DynSelectComponent } from './components/select/select.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    DynFormsModule,
  ],
  declarations: [
    DynArrayComponent,
    DynCardComponent,
    DynGroupComponent,
    DynInputComponent,
    DynRadioComponent,
    DynSelectComponent,
  ],
})
export class DynFormsMaterialModule {
  static forFeature(): ModuleWithProviders<DynFormsMaterialModule> {
    return DynFormsModule.forFeature({
      controls: [
        {
          dynInstance: DynArrayComponent.dynInstance,
          dynControl: DynArrayComponent.dynControl,
          component: DynArrayComponent,
        },
        {
          dynInstance: DynCardComponent.dynInstance,
          dynControl: DynCardComponent.dynControl,
          component: DynCardComponent,
        },
        {
          dynInstance: DynGroupComponent.dynInstance,
          dynControl: DynGroupComponent.dynControl,
          component: DynGroupComponent,
        },
        {
          dynInstance: DynInputComponent.dynInstance,
          dynControl: DynInputComponent.dynControl,
          component: DynInputComponent,
        },
        {
          dynInstance: DynRadioComponent.dynInstance,
          dynControl: DynRadioComponent.dynControl,
          component: DynRadioComponent,
        },
        {
          dynInstance: DynSelectComponent.dynInstance,
          dynControl: DynSelectComponent.dynControl,
          component: DynSelectComponent,
        },
      ],
    });
  }
}
