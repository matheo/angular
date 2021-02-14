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
      title: 'Birth Moon',
      link: './birthmoon',
      description: 'Calculator for the black moon before the birthday.',
    },
  ];
}
