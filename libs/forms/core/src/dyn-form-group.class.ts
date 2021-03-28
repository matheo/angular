import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormGroup<
    TParams extends DynControlParams = DynControlParams,
    TConfig extends DynControlConfig<TParams> = DynControlConfig<TParams>
  >
  extends DynControl<TParams, TConfig, FormGroup>
  implements OnInit {
  static dynInstance = DynInstanceType.Control;

  ngOnInit(): void {
    if (this.config.name) {
      // TODO any default config for FormGroup?
      this.control = new FormGroup({});
      this.parent.control.addControl(this.config.name, this.control);
    } else {
      // fallback to the parent control (useful for )
      this.control = this.parent.control;
    }

    super.ngOnInit();
  }
}
