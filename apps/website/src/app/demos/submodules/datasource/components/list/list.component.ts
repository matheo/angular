import { ChangeDetectionStrategy, Component } from '@angular/core';
import { actions, badges } from '../../constants/datasource.links';
import { SponsorsDatabase, SponsorsDatasource } from '../../services';

@Component({
  selector: 'web-datasource-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [SponsorsDatabase, SponsorsDatasource],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  // ref links
  actions = actions;
  badges = badges;

  constructor(public source: SponsorsDatasource) {}
}
