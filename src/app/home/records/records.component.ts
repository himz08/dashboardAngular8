import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { HttpParams } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { HomeService } from '../home.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

let ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  displayedColumns: string[] = ['tagID', 'vehicleNumber', 'ticketNumber', 'vehicleType','category','parking','paymentMode','status'];
  dataSource;
  public selectedVehicke;
  filterForm : FormGroup;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  vehicleType = [
    { label : 'Car' , value : 'car'},
    {label : 'Bike', value : 'bike'}
]

  
  constructor(private commonService: CommonService, private homeService : HomeService) { }

  ngOnInit() {
    this.fetchRecords();
    this.filterForm = new FormGroup({
      'vehicleType' : new FormControl(''),
      'status': new FormControl(''),
      'paymentMode' : new FormControl(''),
      'parking': new FormControl('')
    });
    this.homeService.emitTabNumber(3);

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onApplyFilterClick(){
      // console.log(this.filterForm.value);
      var valueCopy = JSON.parse(JSON.stringify(this.filterForm.value));
      var result = Object.keys(valueCopy).map(function(key) {
        return [(key), valueCopy[key]];
      });
      let params = new HttpParams();
      result.forEach((el)=>{
        if (el[1] != ""){
          params = params.set(el[0],el[1]);
        }
      })
      
      this.fetchRecords({params : params})
  }


  fetchRecords(options?) {
    this.commonService.fetchAllRecords(options).subscribe(Response => {      
      this.dataSource = new MatTableDataSource<any>(<any>Response);
      this.dataSource.paginator = this.paginator;

    },
      error => {
        console.log('Error', error);
      });
  }
}
