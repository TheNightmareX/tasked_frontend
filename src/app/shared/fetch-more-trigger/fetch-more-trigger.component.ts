import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fetch-more-trigger',
  templateUrl: './fetch-more-trigger.component.html',
  styleUrls: ['./fetch-more-trigger.component.scss'],
})
export class FetchMoreTriggerComponent implements OnInit {
  @Output() trigger = new EventEmitter();
  @Input() loading = false;

  constructor() {}

  ngOnInit() {}

  handleObservation(entires: IntersectionObserverEntry[]) {
    if (entires.length == 1) {
      const entry = entires[0];
      if (entry.isIntersecting) this.trigger.emit();
    }
  }
}
