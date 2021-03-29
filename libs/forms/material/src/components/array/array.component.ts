import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynControl,
  DynControlConfig,
  DynFormArray,
} from '@matheo/dyn-forms/core';
import { DynArrayParams } from './array.component.params';

@Component({
  selector: 'dyn-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DynControl,
      useExisting: forwardRef(() => DynArrayComponent),
    },
  ],
})
export class DynArrayComponent
  extends DynFormArray<DynArrayParams, DynControlConfig>
  implements OnInit {
  static dynControl: 'ARRAY' = 'ARRAY';

  static createConfig(
    partial: Partial<DynControlConfig<DynArrayParams>>
  ): DynControlConfig<DynArrayParams> {
    return {
      ...partial,
      dynControl: DynArrayComponent.dynControl,
    } as DynControlConfig;
  }

  constructor(
    injector: Injector,
    @Inject(DynControl) @SkipSelf() public readonly parent: DynControl
  ) {
    super(injector);
  }

  get items(): FormGroup[] {
    return this.control.controls as FormGroup[];
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  checkParams(params: Partial<DynArrayParams>): DynArrayParams {
    return {
      ...params,
      color: params.color || 'accent',
      addButton: params.addButton || 'Add Item',
      removeButton: params.removeButton || 'Remove',
    };
  }
}
