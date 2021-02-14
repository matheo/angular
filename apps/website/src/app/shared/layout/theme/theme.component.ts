import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'web-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {}
