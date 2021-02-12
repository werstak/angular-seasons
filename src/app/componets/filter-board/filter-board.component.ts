import { Component, Output, EventEmitter } from '@angular/core';
import { GroupType } from '../../enums/group-type.enum';
import { MatSelectChange } from '@angular/material/select';
import { Season } from '../../enums/season.enum';

@Component({
  selector: 'app-filter-board',
  templateUrl: './filter-board.component.html',
  styleUrls: ['./filter-board.component.scss']
})
export class FilterBoardComponent {
  @Output() groupBy = new EventEmitter<GroupType>();
  @Output() filter = new EventEmitter<Season>();

  groupNames = Object.values(GroupType);
  seasonNames = Object.values(Season);

  groupByHandler(groupType: MatSelectChange): void {
    this.groupBy.emit(groupType.value);
  }

  filterHandler(groupType: MatSelectChange): void {
    this.filter.emit(groupType.value);
  }
}
