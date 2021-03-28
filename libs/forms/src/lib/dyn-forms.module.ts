import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FactoryComponent } from './components/factory/factory.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FactoryComponent, FormComponent],
  exports: [FormComponent],
})
export class DynFormsModule {}
