import {Component, OnInit} from '@angular/core';
import {Months} from '../../interfaces/months';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {MonthsService} from '../../services/months.service';
import {map} from 'rxjs/operators';
import {groupBy, sortBy} from 'lodash';
import {GroupType} from '../../enums/group-type.enum';
import {Season} from '../../enums/season.enum';
import {SortType} from '../../enums/sort-type.enum';


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
  sort$ = new BehaviorSubject<SortType | null>(null);
  search$ = new BehaviorSubject<string>('');

  constructor(
    public monthsService: MonthsService,
  ) {
  }

  ngOnInit(): void {
    const months$ = this.monthsService.getMonths();

    this.months$ = combineLatest([
      months$,
      this.filter$,
      this.search$,
      this.sort$,
      this.groupType$
    ])
      .pipe(
        map(([months, filter, search, sort, groupType]) => {
          const filteredMonths = months.filter(month => {
            return !filter || month.season === filter;
          });

          const searchedMonths = filteredMonths.filter(({name, description, season}) => {
            if (!search) {
              return true;
            }
            const regExp = new RegExp(`.*${search}.*`, 'i');
            return regExp.test(name) || regExp.test(description) || regExp.test(season);
          });

          const sortedMonths = sort ? sortBy(searchedMonths, sort) : searchedMonths;

          const groupedMonths = groupBy(sortedMonths, groupType);
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

  sort(sortType: SortType): void {
    this.sort$.next(sortType);
  }

  search(value: string): void {
    this.search$.next(value);
  }
}
