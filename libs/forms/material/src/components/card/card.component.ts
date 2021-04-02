import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  DynControlConfig,
  DynPartialControlConfig,
} from '@myndpm/dyn-forms/core';
import { DynFormContainer } from '@myndpm/dyn-forms/core';
import { DynCardParams } from './card.component.params';

@Component({
  selector: 'dyn-mat-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynCardComponent
  extends DynFormContainer<DynCardParams, DynControlConfig>
  implements OnInit {
  static dynControl: 'CARD' = 'CARD';

  static createConfig(
    partial: DynPartialControlConfig<DynCardParams>
  ): DynControlConfig<DynCardParams> {
    return {
      ...partial,
      control: DynCardComponent.dynControl,
      instance: DynCardComponent.dynInstance,
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  completeParams(params: Partial<DynCardParams>): DynCardParams {
    return params;
  }
}
