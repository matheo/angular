import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormGroup<
    TConfig extends DynControlConfig = DynControlConfig
  >
  extends DynControl<TConfig, FormGroup>
  implements OnInit {
  ngOnInit(): void {
    // TODO any default config for FormGroup?
    this.control = new FormGroup({});
    this.parent.control.addControl(this.config.name, this.control);
  }
}
