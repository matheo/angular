import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
  SkipSelf,
} from '@angular/core';
import {
  DynControl,
  DynControlConfig,
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

  constructor(
    injector: Injector,
    @Inject(DynControl) @SkipSelf() public readonly parent: DynControl
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
