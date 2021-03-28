import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { controlsFactory } from '@matheo/dyn-forms/core';
import { FactoryComponent } from './components/factory/factory.component';
import { FormComponent } from './components/form/form.component';
import { _CONTROLS_ARGS_TOKEN } from './constants/controls.token';
import { DynFormsModuleArgs } from './interfaces/dyn-forms-module-args.interface';

@NgModule({
  imports: [CommonModule],
  declarations: [FactoryComponent, FormComponent],
  exports: [FormComponent],
})
export class DynFormsModule {
  static forFeature(
    args?: DynFormsModuleArgs
  ): ModuleWithProviders<DynFormsModule> {
    return {
      ngModule: DynFormsModule,
      providers: controlsFactory(args?.controls),
    };
  }
}
