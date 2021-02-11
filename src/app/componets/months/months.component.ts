import { Component, OnInit } from '@angular/core';
import { Months } from '../../interfaces/months';


@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent implements OnInit {

  public itemMonth!: Months;
  constructor() { }

  ngOnInit(): void {
    this.getItemAMonth();
  }

  getItemAMonth(): void {
  }
}
