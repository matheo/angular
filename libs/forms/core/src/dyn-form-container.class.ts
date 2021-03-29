import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynBaseConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormContainer<
    TParams extends DynControlParams = DynControlParams,
    TConfig extends DynBaseConfig<TParams> = DynBaseConfig<TParams>
  >
  extends DynControl<TParams, TConfig, FormGroup>
  implements OnInit {
  static dynInstance = DynInstanceType.Container;

  ngOnInit(): void {
    if (this.config.name) {
      this.control = new FormGroup({}, this.config.dynOptions);
      if (this.parent.control.addControl) {
        this.parent.control.addControl(this.config.name, this.control);
      }
    } else if (!this.control) {
      // just bridges the parent FormGroup
      this.control = this.parent.control;
    }

    super.ngOnInit();
  }
}
