import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynFormsModule } from '@matheo/dyn-forms';
import { InputComponent } from './components/input/input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class DynFormsMaterialModule {
  static forFeature(): ModuleWithProviders<DynFormsMaterialModule> {
    return DynFormsModule.forFeature({
      controls: [
        {
          dynControl: InputComponent.dynControl,
          component: InputComponent,
        },
      ],
    });
  }
}
