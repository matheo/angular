import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { DynFormControls } from '@myndpm/dyn-forms/core';

@Component({
  selector: 'dyn-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ControlContainer,
      useValue: {},
    },
  ],
})
export class FormComponent {
  @Input() form = new FormGroup({});
  @Input() controls: DynFormControls = [];
}
