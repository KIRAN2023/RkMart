import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminProductsService } from './adminProducts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements OnInit, CanActivate, CanActivateChild {
  constructor(private authenticate: AdminProductsService, private route: Router) {
  }

  ngOnInit(): void {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticate.admin || sessionStorage.getItem('adminLoggedIn')) {
      // sessionStorage.setItem('adminLogin', `${this.authenticate.admin}`);
      // alert("Login Successfull");
      return true;
    }
    alert("Login to Access Admin");
    this.route.navigate(['/', 'home']);
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute,state);
  }

}
