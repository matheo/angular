import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormGroup<
    TConfig extends DynControlConfig = DynControlConfig
  >
  extends DynControl<TConfig, FormGroup>
  implements OnInit {
  static dynInstance = DynInstanceType.Control;

  ngOnInit(): void {
    if (this.config.name) {
      // TODO any default config for FormGroup?
      this.control = new FormGroup({});
      this.parent.control.addControl(this.config.name, this.control);
    } else {
      // fallback to the parent control
      this.control = this.parent.control;
    }

    super.ngOnInit();
  }
}
