import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'web-birthmoon',
  templateUrl: './birthmoon.component.html',
  styleUrls: ['./birthmoon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirthmoonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
