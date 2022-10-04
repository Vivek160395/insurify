// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { LoginService } from '../Services/login.service';
// import { RecommendationServiceService } from '../Services/recommendation-service.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class PersonGuard implements CanActivate {
//   constructor(private service: RecommendationServiceService, private route: Router, private loginService: LoginService) { }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // return this.checkUser(this.service.userType, this.loginService.stauts);
//   }
//   // checkUser(userType: string, status: string) {
//   //   if (status) {
//   //     if (userType == "Insurer") {
//   //       return this.route.navigateByUrl("/insurance-provider")
//   //     } else {
//   //       return this.route.navigateByUrl('/"login"')
//   //     }
//   //   } else {
//   //     return this.route.navigateByUrl('/login')
//   //   }
//   // }
// }
