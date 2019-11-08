import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { SideBarItem } from './sidebarItem.modal';
import { HomeService } from './home.service';
import { CommonService } from '../shared/common.service';
import { AuthService } from '../log-in/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService]
})
export class HomeComponent implements OnDestroy,OnInit {

  mobileQuery: MediaQueryList;
  public activeID : number = 1;
  fillerNav : SideBarItem[];
  public isLoading : boolean = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher ,
     private authService : AuthService,
      private route : Router,
       private homeService : HomeService,
       private cdr: ChangeDetectorRef,
       private commonService : CommonService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(){
    this.fillerNav = this.homeService.getSideBarItems();  // Fetch sidenav items
    this.homeService.activeTab.subscribe(val => {
      this.activeID = val;
      this.cdr.detectChanges();
    })

    this.homeService.isLoading.subscribe((value : boolean)=> {
      this.isLoading = value;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // On sidnav item click, it will route to specific page
  onSideNavItemClick(value : any){
    this.route.navigate([value.routerLink]);
  }

  // Logout function
  onLogoutClick(){
this.authService.logout();
this.commonService.openSnackBar('Logout Successful', 'Dismiss')
  }

}
