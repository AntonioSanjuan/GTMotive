import { createAction, props } from '@ngrx/store';
import { IBrandTypes } from 'src/app/models/internals/vpic/brandTypes.model';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';

export enum DataActionTypes {
  SetBrands = '[Data] Set Brands Data',
  AddBrands = '[Data] Add Brands Data',
  SetBrandTypes = '[Data] Set BrandTypes Data',


}

export const setBrandsAction = createAction(
  DataActionTypes.SetBrands,
  props<IBrands>()
);


export const addBrandsAction = createAction(
  DataActionTypes.AddBrands,
  props<IBrands>()
)

export const setBrandTypesAction = createAction(
  DataActionTypes.SetBrandTypes,
  props<IBrandTypes>()
)