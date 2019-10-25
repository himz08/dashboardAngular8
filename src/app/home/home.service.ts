import { SideBarItem } from './sidebarItem.modal';
import { EventEmitter, Output } from '@angular/core';



export class HomeService {

  @Output() activeTab = new EventEmitter<number>();

  SideBarItems : SideBarItem[] = [
    {
        displayName : 'Home',
        id : 1,
        routerLink : ''
    },
    {
        displayName : 'Analytics',
        id : 2,
        routerLink : 'home/analytics'
    },
    {
        displayName : 'Records',
        id : 3,
        routerLink : 'home/records'
    }
]

XaxixData = [
  '12:00 AM',
  '01:00 AM',
  '02:00 AM',
  '03:00 AM',
  '04:00 AM',
  '05:00 AM',
  '06:00 AM',
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
  '11:00 PM',
]

getXaxisData() {
  return this.XaxixData.slice();
}

getSideBarItems(){
  return this.SideBarItems.slice();
}

  emitTabNumber(navID : number){
    this.activeTab.emit(navID);
  }

  constructor() { }
}
