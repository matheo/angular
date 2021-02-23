import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SponsorsDatabase, SponsorsDatasource } from '../../services';

@Component({
  selector: 'web-datasource-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [SponsorsDatabase, SponsorsDatasource],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  constructor(public source: SponsorsDatasource) {}
}
