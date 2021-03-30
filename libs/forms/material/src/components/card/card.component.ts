import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
  OnInit,
  SkipSelf,
} from '@angular/core';
import {
  DynControl,
  DynControlConfig,
  DynPartialControlConfig,
} from '@matheo/dyn-forms/core';
import { DynFormContainer } from '@matheo/dyn-forms/core';
import { DynCardParams } from './card.component.params';

@Component({
  selector: 'dyn-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DynControl,
      useExisting: forwardRef(() => DynCardComponent),
    },
  ],
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

  constructor(
    injector: Injector,
    @Inject(DynControl) @SkipSelf() public readonly parent: DynControl
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  checkParams(params: Partial<DynCardParams>): DynCardParams {
    return params;
  }
}
