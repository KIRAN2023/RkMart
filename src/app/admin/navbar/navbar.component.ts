import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProductsService } from '../adminProducts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private adminService:AdminProductsService, private route:Router){}

  logout(){
    this.adminService.admin = false;
    sessionStorage.clear();
    this.route.navigate(['home']);
  }
}
