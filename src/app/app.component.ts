import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routing';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Home | RK MART');
  }
}

