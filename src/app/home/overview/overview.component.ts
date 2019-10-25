import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { BuildingWiseData, combinedData, TotalCountDiv } from '../../shared/interfaces/interface';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public buildingData: any;
  public totalCount: combinedData;
  public totalCountDivData : TotalCountDiv[];


  constructor(private service: CommonService, private homeService : HomeService) { }

  fetchBuildingWiseData() {
    this.service.fetchBuildingWiseData().subscribe((response) => {
      response.forEach(element => {
        var totalSpace = (+element.totalBikeSpace + (+element.totalCarSpace)).toString();
        var totalVacantSpot = (+element.vacantBikeSpace + (+element.vacantCarSpace)).toString();
        element.percentage = +this.calPercentage(element);
        element.titleToDisplay = totalVacantSpot + '/' + totalSpace
      });
      this.buildingData = response;
      // console.log(this.buildingData);
      this.calTotalCount(response);
    });
  }

  calPercentage(element: BuildingWiseData): number {
    const totalSpace = +element.totalBikeSpace + (+element.totalCarSpace);
    const totalVacantSpot = +element.vacantBikeSpace + (+element.vacantCarSpace);
    return Math.round((totalVacantSpot / totalSpace) * 100);
  }

  calTotalCount(response) {
    var data: combinedData = {
      totalCarsToday: 0,
      totalBikesToday: 0,
      totalCarsInside: 0,
      totalBikesInside: 0,
      totalCarSpaceLeft: 0,
      toalBikeSpaceLeft: 0,
      totalCarPayment: 0,
      toalBikePayment: 0
    }

    response.forEach((element) => {
      data.totalCarsToday += (+element.totalCars);
      data.totalBikesToday += (+element.totalBikes);
      data.totalCarsInside += (+element.totalCarSpace - (+element.vacantCarSpace));
      data.totalBikesInside += (+element.totalBikeSpace - (+element.vacantBikeSpace));
      data.totalCarSpaceLeft += (+element.vacantCarSpace);
      data.toalBikeSpaceLeft += (+element.vacantBikeSpace);
      data.totalCarPayment += (+element.carPayment);
      data.toalBikePayment += (+element.bikePayment);
    });
    this.totalCount = data;
    this.totalCountDivData = this.createTotalCountDivData();
  }

  createTotalCountDivData() {
    var data: TotalCountDiv[] = [
      {
        iconNumber: 0,
        data: this.totalCount.totalCarsToday,
        subTitle: 'Total Cars Today'
      },
      {
        iconNumber: 0,
        data: this.totalCount.totalCarsInside,
        subTitle: 'Cars Inside'
      },
      {
        iconNumber: 2,
        data: this.totalCount.totalCarSpaceLeft,
        subTitle: 'Car Space Left'
      },
      {
        iconNumber: 3,
        data: this.totalCount.totalCarPayment,
        subTitle: 'Car Payment'
      },
      {
        iconNumber: 1,
        data: this.totalCount.totalBikesToday,
        subTitle: 'Total Bikes Today'
      },
      {
        iconNumber: 1,
        data: this.totalCount.totalBikesInside,
        subTitle: 'Bikes Inside'
      },
      {
        iconNumber: 2,
        data: this.totalCount.toalBikeSpaceLeft,
        subTitle: 'Bikes Space Left'
      },
      {
        iconNumber: 3,
        data: this.totalCount.toalBikePayment,
        subTitle: 'Bike Payment'
      }
    ]
    return data;
  }
  ngOnInit() {
    this.fetchBuildingWiseData();
    this.homeService.emitTabNumber(1);
  }

}
