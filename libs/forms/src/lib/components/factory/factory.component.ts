import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynBaseConfig } from '@matheo/dyn-forms/core';
import { ControlResolverService } from '../../services/control-resolver.service';

@Component({
  selector: 'dyn-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactoryComponent implements OnInit {
  @Input() config!: DynBaseConfig;

  @ViewChild(TemplateRef, { static: true })
  content!: TemplateRef<any>;

  @ViewChild('container', { static: true, read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private controls: ControlResolverService
  ) {}

  ngOnInit(): void {
    const control = this.controls.resolve(this.config.control);
    const factory = this.resolver.resolveComponentFactory(control.component);

    const ref = this.container.createComponent<any>(
      factory,
      undefined,
      this.injector
      // hierarchy: each group must call the factory to resolve the right parent
      // this.ngContent()
    );
    ref.instance.config = this.config;

    ref.hostView.detectChanges();
  }

  protected ngContent(): any[][] {
    const viewRef = this.content.createEmbeddedView(null);
    this.appRef.attachView(viewRef);
    return [viewRef.rootNodes];
  }
}
