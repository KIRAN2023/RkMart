import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeOffer(){
    const $offerData:any = document.querySelector('.popupMsg');
    $offerData.close();
  }

}
