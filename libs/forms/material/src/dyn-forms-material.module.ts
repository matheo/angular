import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynFormsModule } from '@matheo/dyn-forms';
import { DynCardComponent } from './components/card/card.component';
import { DynInputComponent } from './components/input/input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    DynFormsModule,
  ],
  declarations: [DynCardComponent, DynInputComponent],
})
export class DynFormsMaterialModule {
  static forFeature(): ModuleWithProviders<DynFormsMaterialModule> {
    return DynFormsModule.forFeature({
      controls: [
        {
          dynInstance: DynCardComponent.dynInstance,
          dynControl: DynCardComponent.dynControl,
          component: DynCardComponent,
        },
        {
          dynInstance: DynInputComponent.dynInstance,
          dynControl: DynInputComponent.dynControl,
          component: DynInputComponent,
        },
      ],
    });
  }
}
