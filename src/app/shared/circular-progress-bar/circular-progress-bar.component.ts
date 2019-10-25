import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.css']
})
export class CircularProgressBarComponent implements OnInit {

  constructor() { }

  @Input() tittle : string = "Test";
  test = 'Hello'
  @Input() percentage : number = 10;
  @Input() heading : string;

  ngOnInit() {
  }

  title : string = "5/700000"

  formatTitle = (percent: number) : string => {
    return this.tittle


  }
  formatSubTitle() : string {
    return 'Space left'
  }

}
