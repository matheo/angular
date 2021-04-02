import { Directive, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynInstanceType } from './control.types';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormArray<
    TParams extends DynControlParams = DynControlParams,
    TConfig extends DynControlConfig<TParams> = DynControlConfig<TParams>
  >
  extends DynControl<TParams, TConfig, FormArray>
  implements OnInit {
  static dynInstance = DynInstanceType.Array;

  // auto-register in the form hierarchy
  ngOnInit(): void {
    if (!this.config.name) {
      throw new Error(`02: No name provided for ${this.config.control}`);
    }

    super.ngOnInit();

    this.control = this._form.register(
      DynInstanceType.Array,
      this.config,
      this.parent
    );
  }

  addItem(): void {
    this.control.push(
      this._form.build(DynInstanceType.Group, this.config, true)
    );
  }

  removeItem(index: number): void {
    this.control.removeAt(index);
  }
}
