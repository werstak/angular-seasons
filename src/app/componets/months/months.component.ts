import { Component, OnInit } from '@angular/core';
import { Months } from '../../interfaces/months';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { MonthsService } from '../../services/months.service';
import { map } from 'rxjs/operators';
import { groupBy } from 'lodash';
import { GroupType } from '../../enums/group-type.enum';
import { Season } from '../../enums/season.enum';


@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent implements OnInit {
  months$: Observable<{
    groupName: string,
    months: Months[]
  }[]>;
  groupType$ = new BehaviorSubject<GroupType>(GroupType.Season);
  filter$ = new BehaviorSubject<Season | null>(null);

  constructor(
    public monthsService: MonthsService,
  ) {
  }

  ngOnInit(): void {
    const months$ = this.monthsService.getMonths();

    this.months$ = combineLatest([
      months$,
      this.filter$,
      this.groupType$
    ])
    .pipe(
      map(([months, filter, groupType]) => {
        const filteredMonths = months.filter(month => {
          return !filter || month.season === filter;
        });
        const groupedMonths = groupBy(filteredMonths, groupType);
        return Object.keys(groupedMonths).map((groupName) => {
          return {
            groupName,
            months: groupedMonths[groupName]
          };
        });
      }),
    );

  }

  groupBy(groupType: GroupType): void {
    this.groupType$.next(groupType);
  }

  filter(groupType: Season): void {
    this.filter$.next(groupType);
  }
}
