import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  DynControl,
  DynControlConfig,
  DYN_CONTROLS_TOKEN,
} from '@matheo/dyn-forms/core';

@Component({
  selector: 'dyn-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactoryComponent implements OnInit {
  @Input() config!: DynControlConfig;

  @ViewChild(TemplateRef, { static: true })
  content!: TemplateRef<any>;

  @ViewChild('container', { static: true, read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    @Inject(DYN_CONTROLS_TOKEN) private controls: any[],
    @Inject(DynControl)
    @Optional()
    @SkipSelf()
    public readonly parent: DynControl<DynControlConfig, FormGroup>
  ) {}

  ngOnInit(): void {
    // FIXME proper place to add the control
    this.parent.control.addControl(this.config.name, new FormControl());

    console.log('DYN_CONTROLS_TOKEN', { controls: this.controls });
    const control = this.controls.find(
      ({ dynControl }) => this.config.dynControl === dynControl
    );

    if (!control) {
      throw new Error(`Control '${this.config.dynControl}' not provided`);
    }

    const factory = this.resolver.resolveComponentFactory(control);
    const ref = this.container.createComponent<any>(
      factory,
      undefined,
      this.injector,
      this.ngContent()
    );
    ref.instance.config = this.config;
    ref.hostView.detectChanges();
  }

  private ngContent(): any[][] {
    const viewRef = this.content.createEmbeddedView(null);
    this.appRef.attachView(viewRef);
    return [viewRef.rootNodes];
  }
}
