// Auth guard Service to Authenthicate the user everytime route get activated

import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './shared/common.service'
import { AuthService } from './log-in/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

  constructor(private router: Router, private commonService : CommonService, private authService : AuthService) { }
  login : boolean;
    ngOnInit(){
        this.login = false;
    }
    canActivate(route : ActivatedRouteSnapshot , state : RouterStateSnapshot) : boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        
      return this.authService.user.pipe(map (user => {
           const isAuth = !!user;
           if(isAuth){
               return true;
           }
           else {
               return this.router.createUrlTree(['/login']);
           }
       }))


   }

}
