import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SectionItem } from './item.interface';

@Component({
  selector: 'web-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() item: SectionItem;
}
