import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fetch-more-trigger',
  templateUrl: './fetch-more-trigger.component.html',
  styleUrls: ['./fetch-more-trigger.component.css'],
})
export class FetchMoreTriggerComponent implements OnInit {
  @Output() trigger = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleObservation(entires: IntersectionObserverEntry[]) {
    if (entires.length == 1) {
      const entry = entires[0];
      if (entry.isIntersecting) this.trigger.emit();
    }
  }
}
