import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderStatusUpdate',
  templateUrl: './orderStatusUpdate.component.html',
  styleUrls: ['./orderStatusUpdate.component.css']
})
export class OrderStatusUpdateComponent implements OnInit {
  orderStatus = ['Processing','Packed','Delivered','Cancelled'];
  orderId:any;
  constructor(private router:ActivatedRoute) { 
    this.router.paramMap.subscribe((url:any)=>{
      this.orderId = url.get('orderId');
    })
  }

  ngOnInit() {
  }

}
