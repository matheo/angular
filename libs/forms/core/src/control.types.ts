import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';

export type DynControlType = string; // Control ID

export enum DynInstanceType { // Form Control Type
  Group = 'GROUP',
  Array = 'ARRAY',
  Control = 'CONTROL',
  Container = 'CONTAINER',
}

export interface DynControlParent<T extends AbstractControl = FormGroup>
  extends ControlContainer {
  control: T;
}
