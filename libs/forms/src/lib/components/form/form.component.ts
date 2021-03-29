import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  DynControl,
  DynFormControls,
  DynFormGroup,
} from '@matheo/dyn-forms/core';

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
export class FormComponent extends DynFormGroup<any> implements OnInit {
  // not used in the root
  parent!: DynControl;

  // root FormGroup
  @Input('form') control = this.builder.group({});
  @Input() controls: DynFormControls = [];

  constructor(injector: Injector, private builder: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {}
}