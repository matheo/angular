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
      title: 'Sun-Moon Cycle',
      link: './sunmoon',
      image: '/assets/items/sunmoon.png',
      description: 'Calculator for the sun-moon lifecycles.',
    },
  ];
}
