import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/core/themes.service';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss'],
})
export class ThemeButtonComponent implements OnInit {
  constructor(public themes: ThemesService) {}

  ngOnInit() {}
}
