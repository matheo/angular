import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { controlsFactory } from '@myndpm/dyn-forms/core';
import { FactoryComponent } from './components/factory/factory.component';
import { FormComponent } from './components/form/form.component';
import { DynFormsModuleArgs } from './dyn-forms.module.interface';
import { ControlResolverService } from './services/control-resolver.service';

@NgModule({
  imports: [CommonModule],
  declarations: [FactoryComponent, FormComponent],
  exports: [FactoryComponent, FormComponent],
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
