import { Directive, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormControl<
    TParams extends DynControlParams = DynControlParams,
    TConfig extends DynControlConfig<TParams> = DynControlConfig<TParams>
  >
  extends DynControl<TParams, TConfig, FormControl>
  implements OnInit {
  static dynInstance = DynInstanceType.Control;

  ngOnInit(): void {
    if (this.config.name) {
      this.control =
        (this.parent.control.get(this.config.name) as FormControl) ??
        new FormControl(null, this.config.dynOptions);
      if (this.parent.control.addControl) {
        this.parent.control.addControl(this.config.name, this.control);
      }
    } else {
      throw new Error(
        `Error 02: No name provided for ${this.config.dynControl}`
      );
    }

    super.ngOnInit();
  }
}
