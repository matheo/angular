import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import {
  DynControl,
  DynControlConfig,
  DynControlParams,
  DynFormControl,
} from '@matheo/dyn-forms/core';

@Component({
  selector: 'dyn-material-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynInputComponent extends DynFormControl implements OnInit {
  static dynControl = 'TEXT';

  @Input() config!: DynControlConfig;
  @Input() params!: DynControlParams;

  constructor(
    injector: Injector,
    @Inject(DynControl) public readonly parent: DynControl
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
