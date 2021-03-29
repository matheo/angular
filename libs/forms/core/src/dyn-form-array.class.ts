import { Directive, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormArray<
    TParams extends DynControlParams = DynControlParams,
    TConfig extends DynControlConfig<TParams> = DynControlConfig<TParams>
  >
  extends DynControl<TParams, TConfig, FormArray>
  implements OnInit {
  static dynInstance = DynInstanceType.Array;

  ngOnInit(): void {
    if (this.config.name) {
      this.control = new FormArray([], this.config.dynOptions);
      this.parent.control.addControl(this.config.name, this.control);
    } else {
      throw new Error(
        `Error 02: No name provided for ${this.config.dynControl}`
      );
    }

    super.ngOnInit();
  }
}
