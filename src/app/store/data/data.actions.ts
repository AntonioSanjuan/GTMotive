import { createAction, props } from '@ngrx/store';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';
import { IModels } from 'src/app/models/internals/vpic/models.model';

export enum DataActionTypes {
  SetBrands = '[Data] Set Brands Data',
  AddBrands = '[Data] Add Brands Data',
  AddBrandDetails = '[Data] Add Brands Details Data',
}

export const setBrandsAction = createAction(
  DataActionTypes.SetBrands,
  props<IBrands>()
);


export const addBrandsAction = createAction(
  DataActionTypes.AddBrands,
  props<IBrands>()
)

export const setBrandDetailsAction = createAction(
  DataActionTypes.AddBrandDetails,
  props<{
    brandId: number
    brandDetails: IModels
  }>()
)