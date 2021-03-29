import { Directive, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Directive()
export abstract class DynFormArray<
    TParams extends DynControlParams = DynControlParams,
    TConfig extends DynControlConfig<TParams> = DynControlConfig<TParams>
  >
  extends DynControl<TParams, TConfig, FormArray>
  implements OnInit {
  static dynInstance = DynInstanceType.Array;

  private builder: FormBuilder;

  constructor(injector: Injector) {
    super(injector);
    this.builder = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    if (this.config.name) {
      this.control = this.builder.array(
        [this.buildItem(this.config)],
        this.config.dynOptions
      );
      this.parent.control.addControl(this.config.name, this.control);
    } else {
      throw new Error(
        `Error 02: No name provided for ${this.config.dynControl}`
      );
    }

    super.ngOnInit();
  }

  addItem(): void {
    this.control.push(this.buildItem(this.config));
  }

  protected buildItem(config: TConfig): FormGroup {
    const item = this.builder.group({});
    config.controls?.forEach((control) => {
      // TODO resolve the subcontrols recursively
      item.addControl(control.name, new FormControl(null, control.dynOptions));
    });
    return item;
  }
}
