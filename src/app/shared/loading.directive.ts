import {
  ComponentFactoryResolver,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: '[appLoading]',
})
export class LoadingDirective {
  @Input() appLoadingDiameter?: number;

  @Input()
  set appLoading(loading: boolean) {
    this.viewContainerRef.clear();
    if (!loading) this.createContent();
    else this.createSpinner();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  private createContent() {
    return this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  private createSpinner() {
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(MatSpinner);

    const spinner = this.viewContainerRef.createComponent(factory);

    if (this.appLoadingDiameter)
      spinner.instance.diameter = this.appLoadingDiameter;

    (spinner.instance._elementRef.nativeElement as HTMLElement).setAttribute(
      'style',
      'display: inline-block',
    );

    return spinner;
  }
}
