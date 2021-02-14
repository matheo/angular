import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'web-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  typed: Typed;

  @ViewChild('typed', { static: true }) element: ElementRef;

  ngOnInit(): void {
    this.typed = new Typed(this.element.nativeElement, {
      strings: ['Mateo Tibaquirá', 'Engineer', 'Web Developer', 'Freelancer'],
      typeSpeed: 150,
      loop: true,
    });
  }

  ngOnDestroy(): void {
    this.typed.destroy();
  }
}
