import { Component, OnInit } from '@angular/core'
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from '../home.service';
import { HttpParams } from '@angular/common/http';
import { CommonService } from 'src/app/shared/common.service';
import { filter, tap } from 'rxjs/operators';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

    public mbarChartLabels: string[]; // Labels to display in x-axis
    private fetchedBarChartData : any[];
    public vehichleType = 'all';
    public selectedDate;
    public selectedDateString;
    public faTable = faTable;
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [        // Initialising of Y axis data
        { data: [], label: 'Cars' },
        { data: [], label: 'Bikes' }
    ];    
    public todaysDateStringForm: string; // 25th oct 2019 === 25102019
    constructor(private homeService: HomeService, private commonService : CommonService) { }

    ngOnInit() {
        this.todaysDateStringForm = this.getTodaysDateString();
        this.mbarChartLabels = this.homeService.getXaxisData();
        this.fetchBarChartData(this.todaysDateStringForm); // Fetching today's data
        this.homeService.emitTabNumber(2); // To change the color of active item in side nav bar
    }

    // Bar Chart properties

    public barChartOptions: any = {
        scaleShowVerticalLines: true,
        responsive: true
    };

    public barChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(105,159,177,0.2)',
            borderColor: 'rgba(105,159,177,1)',
            pointBackgroundColor: 'rgba(105,159,177,1)',
            pointBorderColor: '#fafafa',
            pointHoverBackgroundColor: '#fafafa',
            pointHoverBorderColor: 'rgba(105,159,177)'
        },
        {
            backgroundColor: 'rgba(255,165,0,0.4)',
            borderColor: 'rgba(255,165,0,1)',
            pointBackgroundColor: 'rgba(255,165,0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,165,0,1)'
        }
    ];

        // events
        public chartClicked(e: any): void {
            // console.log(e);
        }
    
        public chartHovered(e: any): void {
            // console.log(e);
        }

    // Get todays date and convert it to string 
    getTodaysDateString() {
        var ddString,mmString,yyyyString;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            ddString = '0' + dd.toString();
        }
        else {
            ddString = dd.toString();
        }
        if (mm < 10) {
            mmString = '0' + mm.toString();
        }
        else {
            mmString = mm.toString();
        }
        yyyyString = yyyy.toString();

        var dateString = ddString + mmString + yyyyString;
        // console.log(dateString);
        return dateString;
    }

    onSearchClick(){
        if(this.selectedDate != undefined){
            this.selectedDateString = (this.selectedDate.day.toString() + this.selectedDate.month.toString() + this.selectedDate.year.toString())
            this.dateFilterApplied(this.selectedDateString);  // Fetch data of selected date
        }
        else {
                this.commonService.openSnackBar("Invalid Date.", "Dismiss")
        }
    }

    dateFilterApplied(date){

        let result = this.fetchedBarChartData.filter( el => {
            return el.date == date;
        })
        if(result.length == 1){
            this.barChartData[0].data = JSON.parse(result[0].valueCars);
            this.barChartData[1].data = JSON.parse(result[0].valueBikes);
        }
          else {
                 this.commonService.openSnackBar("Data not found", "Dismiss");
             }
        
    }

    fetchBarChartData(date : string){
        this.homeService.isLoading.next(true);

    this.commonService.fetchHourlyDataByDate().pipe(tap( (el) => {
    }
   )).subscribe(Response => {
        this.homeService.isLoading.next(false);

        this.fetchedBarChartData = Response;
        this.dateFilterApplied(date);
    },
    error => {
        console.log('Error', error);
        this.homeService.isLoading.next(false);
    });
}

}