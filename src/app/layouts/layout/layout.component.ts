import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/loading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(public loading: LoadingService) {}

  ngOnInit() {}
}
