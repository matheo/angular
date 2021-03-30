import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynBaseConfig,
  DynControl,
  DynControlConfig,
  DynControlParams,
  DynFormContainer,
} from '@matheo/dyn-forms/core';

@Component({
  selector: 'dyn-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DynControl,
      useExisting: forwardRef(() => DynGroupComponent),
    },
  ],
})
export class DynGroupComponent extends DynFormContainer implements OnInit {
  static dynControl: 'GROUP' = 'GROUP';

  @Input('group') control!: FormGroup;
  @Input() config: DynBaseConfig = {} as DynBaseConfig;

  static createConfig(partial: Partial<DynControlConfig>): DynControlConfig {
    return {
      ...(partial as DynControlConfig),
      control: DynGroupComponent.dynControl,
      instance: DynGroupComponent.dynInstance,
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

  checkParams(params: Partial<DynControlParams>): DynControlParams {
    return params;
  }
}
