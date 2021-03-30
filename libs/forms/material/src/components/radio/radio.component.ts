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
import { DynRadioParams } from './radio.component.params';

@Component({
  selector: 'dyn-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynRadioComponent
  extends DynFormControl<DynRadioParams>
  implements OnInit {
  static dynControl: 'RADIO' = 'RADIO';

  static createConfig(
    partial: DynPartialControlConfig<DynRadioParams>
  ): DynControlConfig {
    return {
      ...partial,
      control: DynRadioComponent.dynControl,
      instance: DynRadioComponent.dynInstance,
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

  completeParams(params: Partial<DynRadioParams>): DynRadioParams {
    return {
      ...params,
      options: params.options || [],
    };
  }
}
