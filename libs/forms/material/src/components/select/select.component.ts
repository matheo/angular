import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import {
  DynControl,
  DynControlConfig,
  DynFormControl,
} from '@matheo/dyn-forms/core';
import { DynSelectParams } from './select.component.params';

@Component({
  selector: 'dyn-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynSelectComponent
  extends DynFormControl<DynSelectParams>
  implements OnInit {
  static dynControl: 'SELECT' = 'SELECT';

  static createConfig(partial: Partial<DynControlConfig>): DynControlConfig {
    return {
      ...partial,
      dynControl: DynSelectComponent.dynControl,
    } as DynControlConfig;
  }

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
