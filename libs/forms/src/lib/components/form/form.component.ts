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
  DynControlConfig,
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
export class FormComponent extends DynFormGroup implements OnInit {
  parent!: DynControl;

  // root FormGroup
  @Input('form') control = this.builder.group({});
  @Input() config!: DynControlConfig;

  constructor(injector: Injector, private builder: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {}
}
