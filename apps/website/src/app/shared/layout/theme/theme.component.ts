import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'web-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  url!: string;

  constructor(router: Router) {
    this.url = router.url;
  }

  @HostBinding('class.home')
  get isHome(): boolean {
    return this.url === '/';
  }
}
