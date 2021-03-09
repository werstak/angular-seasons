import { Component, OnInit } from '@angular/core';
import { Months } from '../../interfaces/months';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { MonthsService } from '../../services/months.service';
import { filter, map } from 'rxjs/operators';
import { groupBy, sortBy } from 'lodash';
import { GroupType } from '../../enums/group-type.enum';
import { Season } from '../../enums/season.enum';
import { SortType } from '../../enums/sort-type.enum';


@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})

export class MonthsComponent implements OnInit {
  months$: Observable<Months[]>;
  groupedMonths$: Observable<{
    groupName: string,
    months: Months[]
  }[]>;
  groupType$ = new BehaviorSubject<GroupType | null>(null);
  filter$ = new BehaviorSubject<Season[]>([]);
  sort$ = new BehaviorSubject<SortType | null>(null);
  search$ = new BehaviorSubject<string>('');
  displayMode = 1;

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
    ])
      .pipe(
        map(([months, filterBySeason, search, sort]) => {

          const filteredMonths = months.filter(month => {
            if (!filterBySeason.length) {
              return true;
            }
            return filterBySeason.includes(month.season);
          });

          const searchedMonths = filteredMonths.filter(({name, description, season}) => {
            if (!search) {
              return true;
            }
            const regExp = new RegExp(`.*${search}.*`, 'i');
            return regExp.test(name) || regExp.test(description) || regExp.test(season);
          });

          return sort ? sortBy(searchedMonths, sort) : searchedMonths;
        }),
      );

    this.groupedMonths$ = combineLatest([
      this.months$,
      this.groupType$
    ])
      .pipe(
        filter(([groupType]) => !!groupType),
        map(([months, groupType]) => {
          const groupedMonths = groupBy(months, groupType || '');
          return Object.keys(groupedMonths).map((groupName) => {
            return {
              groupName,
              months: groupedMonths[groupName]
            };
          });
        })
      );
  }

  groupBy(groupType: GroupType): void {
    this.groupType$.next(groupType);
  }

  filter(filterBySeason: Season[]): void {
    this.filter$.next(filterBySeason);
  }

  sort(sortType: SortType): void {
    this.sort$.next(sortType);
  }

  search(value: string): void {
    this.search$.next(value);
  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
}
