import { Moment } from 'moment';
import { ITags } from 'app/shared/model/tags.model';
import { IReviewReveals } from 'app/shared/model/review-reveals.model';

export interface IItems {
  id?: number;
  amazonId?: string;
  name?: string;
  price?: number;
  reviewNumber?: number;
  reviewEvaluation?: number;
  linkurl?: string;
  cleated?: Moment;
  updated?: Moment;
  tags?: ITags[];
  reviewReveals?: IReviewReveals;
}

export const defaultValue: Readonly<IItems> = {};
