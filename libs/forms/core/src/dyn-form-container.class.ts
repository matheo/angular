import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormContainer<
    TConfig extends DynControlConfig = DynControlConfig
  >
  extends DynControl<TConfig, FormGroup>
  implements OnInit {
  static dynInstance = DynInstanceType.Container;

  ngOnInit(): void {
    // just bridges the parent FormGroup
    this.control = this.parent.control;
  }
}
