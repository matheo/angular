import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynControl, DynControlConfig } from '@matheo/dyn-forms/core';

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
export class FormComponent extends DynControl implements OnInit {
  parent!: DynControl;

  @Input() config!: DynControlConfig;

  constructor(injector: Injector, private builder: FormBuilder) {
    super(injector);
    // root FormGroup
    this.control = this.builder.group({});
  }

  ngOnInit(): void {}
}
