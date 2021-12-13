import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;

  @ViewChild('spinner')
  private spinnerTemplateRef!: TemplateRef<never>;
  private spinnerOverlayRef;

  constructor(
    private loading: LoadingService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
  ) {
    this.loading$ = this.loading.value$.pipe(
      debounceTime(100),
      tap((v) => (v ? this.showSpinner() : this.hideSpinner())),
    );

    this.spinnerOverlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.hideSpinner();
  }

  private showSpinner() {
    this.spinnerOverlayRef.attach(
      new TemplatePortal(this.spinnerTemplateRef, this.viewContainerRef),
    );
  }

  private hideSpinner() {
    this.spinnerOverlayRef.detach();
  }
}
