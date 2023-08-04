import { featureData } from './data.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './models/data.state';

// feature selector
export const selectDataState = createFeatureSelector<DataState>(featureData);

// child selector
export const selectBrands = createSelector(
  selectDataState,
  (state) => state.brands
);

export const selectBrandTypes = createSelector(
  selectDataState,
  (state) => state.brandTypes
);