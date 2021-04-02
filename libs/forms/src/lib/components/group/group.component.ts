import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { DynControlConfig } from '@myndpm/dyn-forms/core';

@Component({
  selector: 'dyn-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * This component just wraps the incoming controls in a FormGroup.
 */
export class GroupComponent {
  @Input() group!: FormGroup;
  @Input() controls?: DynControlConfig[];

  constructor(public parent: ControlContainer) {}
}
