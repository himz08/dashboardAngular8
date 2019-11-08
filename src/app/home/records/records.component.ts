import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  displayedColumns: string[] = ['tagID', 'vehicleNumber', 'ticketNumber', 'vehicleType', 'category', 'parking', 'paymentMode', 'status'];
  dataSource;
  public selectedVehicke;
  filterForm: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  vehicleType = [
    { label: 'Car', value: 'car' },
    { label: 'Bike', value: 'bike' }
  ]

  constructor(private commonService: CommonService, private homeService: HomeService) { }

  ngOnInit() {
    this.fetchRecords(); // Fetch All Records from DB
    this.filterForm = new FormGroup({
      'vehicleType': new FormControl(''),
      'status': new FormControl(''),
      'paymentMode': new FormControl(''),
      'parking': new FormControl('')
    });
    this.homeService.emitTabNumber(3);

  }

  applyFilter(filterValue: string) { // Required function to enable search in mat table 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onApplyFilterClick() {
    var valueCopy = JSON.parse(JSON.stringify(this.filterForm.value));
    var result = Object.keys(valueCopy).map(function (key) {
      return [(key), valueCopy[key]];
    });
    let params = new HttpParams(); // Generate params acc to filters
    result.forEach((el) => {
      if (el[1] != "") {
        params = params.set(el[0], el[1]);
      }
    })
    this.fetchRecords({ params: params }) // Fetch records according to filters
  }

  fetchRecords(options?) {
    this.homeService.isLoading.next(true);
    this.commonService.fetchAllRecords(options).subscribe(Response => {
      this.homeService.isLoading.next(false);
      this.dataSource = new MatTableDataSource<any>(<any>Response);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        this.homeService.isLoading.next(false);
        console.log('Error', error);
      });
  }
}
