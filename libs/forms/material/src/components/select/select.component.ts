import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { MatOption } from '@angular/material/core';
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

  static createConfig(
    partial: Partial<DynControlConfig<DynSelectParams>>
  ): DynControlConfig {
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

  checkParams(params: Partial<DynSelectParams>): DynSelectParams {
    function compareWith(o1: any, o2: any): boolean {
      // tslint:disable-next-line: triple-equals
      return o1 == o2;
    }

    function sortComparator(a: MatOption, b: MatOption): number {
      return a.value.localeCompare(b.value);
    }

    return {
      ...params,
      placeholder: params.placeholder || '',
      multiple: Boolean(params.multiple),
      options: params.options || [],
      compareWith: params.compareWith || compareWith,
      sortComparator: params.sortComparator || sortComparator,
      panelClass: params.panelClass || '',
    };
  }
}
