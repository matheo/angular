import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynBaseConfig } from './control-config.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormContainer<
    TConfig extends DynBaseConfig = DynBaseConfig
  >
  extends DynControl<TConfig, FormGroup>
  implements OnInit {
  static dynInstance = DynInstanceType.Container;

  ngOnInit(): void {
    if (this.config.name) {
      // TODO any default config for FormGroup?
      this.control = new FormGroup({});
      this.parent.control.addControl(this.config.name, this.control);
    } else {
      // just bridges the parent FormGroup
      this.control = this.parent.control;
    }
  }
}
