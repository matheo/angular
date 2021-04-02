import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynBaseConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynInstanceType } from './control.types';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormContainer<
    TParams extends DynControlParams = DynControlParams,
    TConfig extends DynBaseConfig<TParams> = DynBaseConfig<TParams>
  >
  extends DynControl<TParams, TConfig, FormGroup>
  implements OnInit {
  static dynInstance = DynInstanceType.Container;

  // auto-register in the form hierarchy
  ngOnInit(): void {
    super.ngOnInit();

    if (this.config.name) {
      this.control = this._form.register(
        DynInstanceType.Container,
        this.config,
        this.parent
      );
    } else if (!this.control) {
      // fallback to the parent control
      this.control = this.parent.control;
    }
  }
}
