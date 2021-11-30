import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'web-form-stepper-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
