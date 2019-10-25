import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuildingWiseData, AllBuildingsData } from './interfaces/interface';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiUrl = 'http://localhost:3000/';

  constructor(private http : HttpClient, private snackBar: MatSnackBar) { }

  login(options: object) {
    return this.http.get( this.apiUrl + 'Users', options);
  }

  isLoggedIn(){
    
    if(localStorage.getItem('userId')) {
      return true;
    }
    else {
      return false;
    }
  }

  fetchBuildingWiseData() {
    return this.http.get<AllBuildingsData>(`${this.apiUrl}BuildingWiseData/`)
  }

  fetchHourlyDataByDate(options){
    return this.http.get(this.apiUrl + 'DateWiseHourlyData', options)
  }

  fetchAllRecords(options?){
    if(options){
      return this.http.get(this.apiUrl + 'Records', options)
    }
    else {
      return this.http.get(this.apiUrl + 'Records')
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }



}
