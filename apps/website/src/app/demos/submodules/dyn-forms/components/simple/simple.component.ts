import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynFormControls } from '@matheo/dyn-forms/core';

@Component({
  selector: 'web-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SimpleComponent implements OnInit {
  controls: DynFormControls = [
    {
      dynControl: 'CARD',
      name: 'profile',
      controls: [
        {
          name: 'name',
          dynControl: 'TEXT',
        },
      ],
    },
    {
      dynControl: 'CARD',
      name: 'items',
      controls: [
        {
          name: 'name',
          dynControl: 'TEXT',
        },
      ],
    },
  ];
  form = this.builder.group({});

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log);
  }
}
