import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SponsorsDatasource } from '../../services';

@Component({
  selector: 'web-datasource-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent implements OnInit {
  @Input() source: SponsorsDatasource;
  @Input() columns = ['name', 'tier', 'following', 'visibility'];

  @ViewChild('sort', { static: true }) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.source.setSort(this.sort);
  }
}
