import { Component, Output, EventEmitter } from '@angular/core';
import { GroupType } from '../../enums/group-type.enum';
import { MatSelectChange } from '@angular/material/select';
import { Season } from '../../enums/season.enum';
import { SortType } from '../../enums/sort-type.enum';


@Component({
  selector: 'app-filter-board',
  templateUrl: './filter-board.component.html',
  styleUrls: ['./filter-board.component.scss']
})
export class FilterBoardComponent {
  @Output() groupBy = new EventEmitter<GroupType>();
  @Output() filter = new EventEmitter<Season[]>();
  @Output() sort = new EventEmitter<SortType>();
  @Output() search = new EventEmitter<string>();

  groupNames = Object.values(GroupType);
  seasonNames = Object.values(Season);
  sortNames = Object.values(SortType);
  searchValue = '';

  groupByHandler(groupType: MatSelectChange): void {
    this.groupBy.emit(groupType.value);
  }

  filterHandler(groupType: MatSelectChange): void {
    this.filter.emit(groupType.value);
  }

  sortHandler(sort: MatSelectChange): void {
    this.sort.emit(sort.value);
  }

  searchHandler(): void {
    this.search.emit(this.searchValue);
  }

}
