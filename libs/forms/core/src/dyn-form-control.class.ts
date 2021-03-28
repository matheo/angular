import { Directive, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormControl<
    TConfig extends DynControlConfig = DynControlConfig
  >
  extends DynControl<TConfig, FormControl>
  implements OnInit {
  ngOnInit(): void {
    // TODO any default config for FormControl?
    this.control = new FormControl();
    this.parent.control.addControl(this.config.name, this.control);
  }
}
