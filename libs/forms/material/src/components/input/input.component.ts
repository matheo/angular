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
import { DynInputParams } from './input.component.params';

@Component({
  selector: 'dyn-material-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynInputComponent
  extends DynFormControl<DynInputParams>
  implements OnInit {
  static dynControl: 'INPUT' = 'INPUT';

  static createConfig(
    partial: Partial<DynControlConfig<DynInputParams>>
  ): DynControlConfig {
    return {
      ...partial,
      dynControl: DynInputComponent.dynControl,
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

  checkParams(params: Partial<DynInputParams>): DynInputParams {
    return {
      ...params,
      type: params.type || 'text',
      label: params.label || '',
      placeholder: params.placeholder || '',
    };
  }
}
