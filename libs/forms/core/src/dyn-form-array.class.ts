import { Directive, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormArray<
    TConfig extends DynControlConfig = DynControlConfig
  >
  extends DynControl<TConfig, FormArray>
  implements OnInit {
  ngOnInit(): void {
    // TODO any default config for FormArray?
    this.control = new FormArray();
    this.parent.control.addControl(this.config.name, this.control);
  }
}
