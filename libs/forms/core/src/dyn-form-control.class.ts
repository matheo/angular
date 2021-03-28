import { Directive, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormControl<
    TConfig extends DynControlConfig = DynControlConfig
  >
  extends DynControl<TConfig, FormControl>
  implements OnInit {
  static dynInstance = DynInstanceType.Control;

  ngOnInit(): void {
    if (this.config.name) {
      // TODO any default config for FormControl?
      this.control = new FormControl();
      this.parent.control.addControl(this.config.name, this.control);
    } else {
      throw new Error(
        `Error 02: No name provided for ${this.config.dynControl}`
      );
    }
  }
}
