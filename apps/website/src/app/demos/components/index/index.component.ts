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
      title: 'DataSource',
      link: './datasource',
      image: '/assets/items/datasource.png',
      description:
        'Reactive Datasource for Angular ' +
        'fetching data from Firestore with filters and pagination.',
    },
    {
      title: 'DatePicker',
      link: './datepicker',
      image: '/assets/items/datepicker.png',
      description: 'DateTime module for Angular Material.',
    },
    {
      title: 'Simple Dynamic Form',
      link: './dyn-forms/simple-form',
      image: '/assets/items/dyn-forms.png',
      description: 'Simple Dynamic Forms Demo.',
    },
  ];
}
