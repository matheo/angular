import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionItem } from '../../../shared/layout/item/item.interface';

@Component({
  selector: 'web-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {
  items: SectionItem[] = [
    {
      title: 'DatePicker',
      link: './datepicker',
      description: 'DateTime module for Angular Material.',
    },
  ];
}
