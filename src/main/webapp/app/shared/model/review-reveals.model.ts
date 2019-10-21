import { Moment } from 'moment';
import { IItems } from 'app/shared/model/items.model';

export interface IReviewReveals {
  id?: number;
  itemId?: number;
  tanteiRatio?: number;
  tanteiReview?: number;
  checkerRatio?: number;
  checkerReview?: number;
  filterdRatio?: number;
  filterdReview?: number;
  cleated?: Moment;
  updated?: Moment;
  items?: IItems;
}

export const defaultValue: Readonly<IReviewReveals> = {};
