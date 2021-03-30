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
    if (!this.config.name) {
      throw new Error(
        `Error 02: No name provided for ${this.config.dynControl}`
      );
    }

    super.ngOnInit();

    this.control = this._form.register(
      DynInstanceType.Control,
      this.config,
      this.parent
    );
  }
}
