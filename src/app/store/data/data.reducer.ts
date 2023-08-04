import { createReducer, on } from '@ngrx/store';
import { DataState } from './models/data.state';
import { appDataInitialState } from './models/data.initialState';
import { addBrandsAction, setBrandTypesAction, setBrandsAction } from './data.actions';

export const featureData = 'data';

export const DataReducer = createReducer<DataState>(
  appDataInitialState,
  on(setBrandsAction, (state, action): DataState => {
    return {
      ...state,
      brands: action,
    };
  }),
  on(addBrandsAction, (state, action): DataState => {
    return {
      ...state,
      brands: {
        ...action,
        results: state.brands?.results
          ? [...state.brands?.results, ...action.results]
          : [...action.results]
      },
    };
  }),
  on(setBrandTypesAction, (state, action): DataState => {
    return {
      ...state,
      brandTypes: action
    }
  })
);
