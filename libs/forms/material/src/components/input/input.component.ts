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
  DynPartialControlConfig,
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
    partial: DynPartialControlConfig<DynInputParams>
  ): DynControlConfig {
    return {
      ...partial,
      control: DynInputComponent.dynControl,
      instance: DynInputComponent.dynInstance,
    };
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

  completeParams(params: Partial<DynInputParams>): DynInputParams {
    return {
      ...params,
      type: params.type || 'text',
      label: params.label || '',
      placeholder: params.placeholder || '',
    };
  }
}
