import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynControl, DynFormControls } from '@myndpm/dyn-forms/core';

@Component({
  selector: 'dyn-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DynControl,
      useExisting: forwardRef(() => FormComponent),
    },
  ],
})
export class FormComponent extends DynControl {
  // root FormGroup
  @Input('form') control = new FormGroup({});
  @Input() controls: DynFormControls = [];

  // not used in the root
  parent!: DynControl;
  config = {} as any;

  // not used but required to be API compliant
  completeParams(params: any): any {
    return params;
  }
}
