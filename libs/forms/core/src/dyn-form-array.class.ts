import { Directive, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormArray<
    TConfig extends DynControlConfig = DynControlConfig
  >
  extends DynControl<TConfig, FormArray>
  implements OnInit {
  static dynInstance = DynInstanceType.Array;

  ngOnInit(): void {
    if (this.config.name) {
      // TODO any default config for FormArray?
      this.control = new FormArray();
      this.parent.control.addControl(this.config.name, this.control);
    } else {
      throw new Error(
        `Error 02: No name provided for ${this.config.dynControl}`
      );
    }

    super.ngOnInit();
  }
}
