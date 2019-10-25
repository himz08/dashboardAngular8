import { Component, OnInit, Input } from '@angular/core';
import { faCar, faMotorcycle, faParking, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-total-count-div',
  templateUrl: './total-count-div.component.html',
  styleUrls: ['./total-count-div.component.css']
})
export class TotalCountDivComponent implements OnInit {

  icons = [faCar, faMotorcycle, faParking, faRupeeSign];
  displayIcon;
  @Input() set iconNumber(value){
    this.displayIcon = this.icons[+value];
  }
  @Input() subTitle : string;
  @Input() data : number;

  faCar = faCar;
  faMotorcycle = faMotorcycle;

  constructor() { }

  ngOnInit() {
  }

}
