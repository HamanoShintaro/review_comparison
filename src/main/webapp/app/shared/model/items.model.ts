import { Moment } from 'moment';
import { IReviewReveals } from 'app/shared/model/review-reveals.model';
import { ITags } from 'app/shared/model/tags.model';

export interface IItems {
  id?: number;
  amazonId?: string;
  name?: string;
  price?: number;
  reviewNumber?: number;
  reviewEvaluation?: number;
  linkUrl?: string;
  cleated?: Moment;
  updated?: Moment;
  reviewReveals?: IReviewReveals;
  tags?: ITags[];
}

export const defaultValue: Readonly<IItems> = {};
