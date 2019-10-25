export class SideBarItem {

    public displayName : string;
    public id : number;
    public routerLink : string;

    constructor(displayName : string, id : number , routerLink : string){
        this.displayName = displayName;
        this.id = id;
        this.routerLink = routerLink;
    }

}