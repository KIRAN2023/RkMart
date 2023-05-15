import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { ProductsDataService } from 'src/app/user/productsData.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate, CanActivateChild {
  constructor(private authenticate: ProductsDataService, private route:Router) { }
  
  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean {
    if (this.authenticate.userLogin||sessionStorage.getItem('userLoggedIn')) {
       return true;
    }
    alert("Login to Access");
    this.route.navigate(['home']);
    return false;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    return this.canActivate(childRoute,state);
  }
}
