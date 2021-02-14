import { Season } from '../enums/season.enum';

export interface Months {
  name: string;
  image: string;
  date: string;
  description: string;
  days_count: number;
  season: Season;
}
