import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynFormConfig } from '@matheo/dyn-forms/core';

@Component({
  selector: 'web-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleComponent implements OnInit {
  config: DynFormConfig = {
    controls: [
      {
        name: 'field',
        dynControl: 'TEXT',
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
