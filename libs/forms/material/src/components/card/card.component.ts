import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { DynControl, DynControlConfig } from '@matheo/dyn-forms/core';
import { DynFormContainer } from '@matheo/dyn-forms/core';
import { DynCardParams } from './card.component.params';

@Component({
  selector: 'dyn-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DynControl,
      useExisting: forwardRef(() => DynCardComponent),
    },
  ],
})
export class DynCardComponent extends DynFormContainer implements OnInit {
  static dynControl = 'CARD';

  @Input() config!: DynControlConfig;
  @Input() params!: DynCardParams;

  constructor(
    injector: Injector,
    @Inject(DynControl) @SkipSelf() public readonly parent: DynControl
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
