import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  redirectToMap(){
    window.open("https://goo.gl/maps/Xh3yJtKUUQozvtAr8","_blank");
  }

}
