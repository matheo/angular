import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { controlsFactory } from '@myndpm/dyn-forms/core';
import { FactoryComponent, FormComponent, GroupComponent } from './components';
import { DynFormsModuleArgs } from './dyn-forms.module.interface';
import { ControlResolverService } from './services';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FactoryComponent, FormComponent, GroupComponent],
  exports: [FactoryComponent, FormComponent, GroupComponent],
  providers: [ControlResolverService],
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
