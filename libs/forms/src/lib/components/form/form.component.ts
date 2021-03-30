import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Injector,
  Input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynControl, DynFormControls } from '@matheo/dyn-forms/core';

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
export class FormComponent extends DynControl<any> {
  // root FormGroup
  @Input('form') control = this.builder.group({});
  @Input() controls: DynFormControls = [];

  // not used in the root
  parent!: DynControl;
  config = {} as any;

  constructor(injector: Injector, private builder: FormBuilder) {
    super(injector);
  }

  // not used but required to be API compliant
  completeParams(params: any): any {
    return params;
  }
}
