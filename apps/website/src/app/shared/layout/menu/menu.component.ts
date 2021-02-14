import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'web-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  menu = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Demos',
      link: '/demos',
    },
    {
      text: 'Lab',
      link: '/lab',
    },
  ];
}
