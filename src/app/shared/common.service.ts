import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuildingWiseData, AllBuildingsData } from './interfaces/interface';
import { MatSnackBar } from '@angular/material';
import { filter, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiUrl = 'https://dashboardvechiclemonitor.firebaseio.com/';

  constructor(private http : HttpClient, private snackBar: MatSnackBar) { }



  fetchBuildingWiseData() {
    return this.http.get<AllBuildingsData>(`${this.apiUrl}BuildingWiseData.json/`)
  }

  fetchHourlyDataByDate(){
    return this.http.get<any>(this.apiUrl + 'DateWiseHourlyData.json');
  }

  fetchAllRecords(options?){
    if(options){
      console.log(options);
      return this.http.get(this.apiUrl + 'Records.json', options)
    }
    else {
      return this.http.get(this.apiUrl + 'Records.json')
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }



}
