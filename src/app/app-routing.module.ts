import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LogInComponent } from './log-in/log-in.component'
import { AuthGuard } from './auth-guard'
import { AnalyticsComponent } from './home/analytics/analytics.component'
import { RecordsComponent } from './home/records/records.component'
import { OverviewComponent } from './home/overview/overview.component'



const appRoutes : Routes = [
    { path : 'home' , redirectTo : 'home/overview'},
    { path : 'home' , component : HomeComponent , canActivate : [AuthGuard] , children : [
        { path : 'overview' , component : OverviewComponent},
        { path : 'analytics' , component : AnalyticsComponent},
        { path : 'records' , component : RecordsComponent}
    ] },
    { path : 'login' , component : LogInComponent},
    { path : '' , redirectTo : 'home/overview' , pathMatch : 'full' },
    { path : '**' , redirectTo : '' , pathMatch : 'full' }
];

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)], 
    exports : [RouterModule]
})
export class AppRoutingModule {

}