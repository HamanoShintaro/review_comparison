import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITags, defaultValue } from 'app/shared/model/tags.model';

export const ACTION_TYPES = {
  FETCH_TAGS_LIST: 'tags/FETCH_TAGS_LIST',
  FETCH_TAGS: 'tags/FETCH_TAGS',
  CREATE_TAGS: 'tags/CREATE_TAGS',
  UPDATE_TAGS: 'tags/UPDATE_TAGS',
  DELETE_TAGS: 'tags/DELETE_TAGS',
  RESET: 'tags/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITags>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TagsState = Readonly<typeof initialState>;

// Reducer

export default (state: TagsState = initialState, action): TagsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TAGS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TAGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TAGS):
    case REQUEST(ACTION_TYPES.UPDATE_TAGS):
    case REQUEST(ACTION_TYPES.DELETE_TAGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TAGS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TAGS):
    case FAILURE(ACTION_TYPES.CREATE_TAGS):
    case FAILURE(ACTION_TYPES.UPDATE_TAGS):
    case FAILURE(ACTION_TYPES.DELETE_TAGS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAGS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAGS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TAGS):
    case SUCCESS(ACTION_TYPES.UPDATE_TAGS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TAGS):
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

const apiUrl = 'api/tags';

// Actions

export const getEntities: ICrudGetAllAction<ITags> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TAGS_LIST,
  payload: axios.get<ITags>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITags> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TAGS,
    payload: axios.get<ITags>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITags> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TAGS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITags> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TAGS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITags> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TAGS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
