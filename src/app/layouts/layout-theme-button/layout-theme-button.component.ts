import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/core/themes.service';

@Component({
  selector: 'app-layout-theme-button',
  templateUrl: './layout-theme-button.component.html',
  styleUrls: ['./layout-theme-button.component.scss'],
})
export class LayoutThemeButtonComponent implements OnInit {
  constructor(public themes: ThemesService) {}

  ngOnInit() {}
}
