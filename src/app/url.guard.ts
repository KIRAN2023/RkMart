import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlGuard implements CanActivate {
  navigatePermission: boolean = false
  constructor(private route: Router) {

  }
  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean {
    // if (state?.url.startsWith('/cart') && !this.navigatePermission) {
    //   if (Notification.permission === "granted") {
    //     new Notification("Direct Access is Denied");
    //   } else if (Notification.permission === "default") {
    //     Notification.requestPermission().then((permission) => {
    //       if (permission === "granted") {
    //         new Notification("Direct Access id Denied");
    //       }
    //     })
    //   }
    //   this.navigatePermission = false;
    //   this.route.navigate(['/cart']);
    //   return this.navigatePermission;
    // }
    // return this.navigatePermission = true;
    return true;
  }
}