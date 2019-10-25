// Auth guard Service to Authenthicate the user everytime route get activated

import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './shared/common.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

  constructor(private router: Router, private commonService : CommonService) { }
  login : boolean;
    ngOnInit(){
        this.login = false;
    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }

  isLoggedIn() {
      this.login = this.commonService.isLoggedIn();
    if (this.login) {
      return true;
    }
    else {
      this.router.navigate(['/login'])
      return false
    }
  }

}
