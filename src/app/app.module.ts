import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CircularProgressBarComponent } from './shared/circular-progress-bar/circular-progress-bar.component';

// Modules
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component'
import { AuthGuard } from './auth-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleBundle } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { AnalyticsComponent } from './home/analytics/analytics.component'
import { RecordsComponent } from './home/records/records.component'
import { OverviewComponent } from './home/overview/overview.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TotalCountDivComponent } from './home/overview/total-count-div/total-count-div.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DropdownModule} from 'primeng/dropdown';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CircularProgressBarComponent,
    HomeComponent,
    LogInComponent,
    AnalyticsComponent,
    RecordsComponent,
    OverviewComponent,
    TotalCountDivComponent
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot({
      radius: 50,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 7,
      outerStrokeColor: "#fe8700",
      outerStrokeGradientStopColor: "#ffa600",
      innerStrokeColor: "#f1f0f0",
      innerStrokeWidth: 4,
      title: "UI",
      titleColor: "#0482de",
      titleFontSize: "34",
      animateTitle: false,
      animationDuration: 1900,
      showUnits: false,
      showBackground: false,
      showInnerStroke: true,
      startFromZero: false
    }),
    AppRoutingModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MaterialModuleBundle,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ChartsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
