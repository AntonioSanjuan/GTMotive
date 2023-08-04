import { createReducer, on } from '@ngrx/store';
import { DataState } from './models/data.state';
import { appDataInitialState } from './models/data.initialState';
import { addBrandsAction, setBrandDetailsAction, setBrandsAction } from './data.actions';
import { IBrand } from 'src/app/models/internals/vpic/brand.model';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';

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
  on(setBrandDetailsAction, (state, action): DataState => {
    const updatedBrandsResults: IBrand[] = state.brands?.results ? 
    [
      ...state.brands?.results?.map((brand: IBrand) => {
        if(brand.mfr_ID === action.brandId) {
          return {
            ...brand,
            models: action.brandDetails,

          }
        }
        return brand
      })
    ]
    : 
    [...state.brands?.results as Array<IBrand>]

    return {
      ...state,
      brands: {
        ...state.brands as IBrands,
        results: updatedBrandsResults
      }
    }
  }),
);
