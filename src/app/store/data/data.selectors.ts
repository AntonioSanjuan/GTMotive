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

export const selectBrandById = (brandId: number) => createSelector(
  selectDataState,
  (state: DataState) => state.brands?.results.find((brand) => {return brand.mfr_ID === brandId})
);