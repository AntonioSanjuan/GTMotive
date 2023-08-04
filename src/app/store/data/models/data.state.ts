import { IBrandTypes } from "src/app/models/internals/vpic/brandTypes.model";
import { IBrands } from "src/app/models/internals/vpic/brands.model";

export interface DataState {
  brands?: IBrands;
  brandTypes?: IBrandTypes
}
