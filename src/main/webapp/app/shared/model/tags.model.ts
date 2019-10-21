import { Moment } from 'moment';
import { IItems } from 'app/shared/model/items.model';

export interface ITags {
  id?: number;
  name?: string;
  cleated?: Moment;
  updated?: Moment;
  items?: IItems[];
}

export const defaultValue: Readonly<ITags> = {};
