import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynControlConfig } from '@matheo/dyn-forms/core';

@Component({
  selector: 'web-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleComponent implements OnInit {
  config: DynControlConfig = {
    name: 'field',
    dynControl: 'TEXT',
  };

  constructor() {}

  ngOnInit(): void {}
}
