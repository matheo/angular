import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { DynControl, DynFormControl } from '@matheo/dyn-forms/core';

@Component({
  selector: 'dyn-material-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynInputComponent extends DynFormControl implements OnInit {
  static dynControl = 'TEXT';

  constructor(
    injector: Injector,
    @Inject(DynControl) public readonly parent: DynControl
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
