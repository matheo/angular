import { ChangeDetectionStrategy, Component } from '@angular/core';

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
      options: { exact: true },
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
