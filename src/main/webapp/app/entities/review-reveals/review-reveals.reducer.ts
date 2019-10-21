import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReviewReveals, defaultValue } from 'app/shared/model/review-reveals.model';

export const ACTION_TYPES = {
  FETCH_REVIEWREVEALS_LIST: 'reviewReveals/FETCH_REVIEWREVEALS_LIST',
  FETCH_REVIEWREVEALS: 'reviewReveals/FETCH_REVIEWREVEALS',
  CREATE_REVIEWREVEALS: 'reviewReveals/CREATE_REVIEWREVEALS',
  UPDATE_REVIEWREVEALS: 'reviewReveals/UPDATE_REVIEWREVEALS',
  DELETE_REVIEWREVEALS: 'reviewReveals/DELETE_REVIEWREVEALS',
  RESET: 'reviewReveals/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReviewReveals>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ReviewRevealsState = Readonly<typeof initialState>;

// Reducer

export default (state: ReviewRevealsState = initialState, action): ReviewRevealsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REVIEWREVEALS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REVIEWREVEALS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REVIEWREVEALS):
    case REQUEST(ACTION_TYPES.UPDATE_REVIEWREVEALS):
    case REQUEST(ACTION_TYPES.DELETE_REVIEWREVEALS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REVIEWREVEALS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REVIEWREVEALS):
    case FAILURE(ACTION_TYPES.CREATE_REVIEWREVEALS):
    case FAILURE(ACTION_TYPES.UPDATE_REVIEWREVEALS):
    case FAILURE(ACTION_TYPES.DELETE_REVIEWREVEALS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REVIEWREVEALS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REVIEWREVEALS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REVIEWREVEALS):
    case SUCCESS(ACTION_TYPES.UPDATE_REVIEWREVEALS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REVIEWREVEALS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/review-reveals';

// Actions

export const getEntities: ICrudGetAllAction<IReviewReveals> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REVIEWREVEALS_LIST,
  payload: axios.get<IReviewReveals>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IReviewReveals> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REVIEWREVEALS,
    payload: axios.get<IReviewReveals>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReviewReveals> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REVIEWREVEALS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReviewReveals> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REVIEWREVEALS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReviewReveals> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REVIEWREVEALS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
