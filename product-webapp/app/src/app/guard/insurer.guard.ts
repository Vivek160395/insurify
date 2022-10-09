import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsurerGuard implements CanActivate {
  constructor(private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkuser(state.url);
  }
  checkuser(url: any) {
    if (localStorage.getItem('UserType') == "insuranceprovider") {
      return this.route.navigateByUrl("/home/insurance-provider");
    } else {
      return this.route.navigateByUrl(url);
    }
  }
}
