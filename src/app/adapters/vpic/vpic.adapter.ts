import { Adapter } from "../common/adapter";
import { Brand, IBrand } from "src/app/models/internals/vpic/brand.model";
import { BrandsDto } from "src/app/models/dtos/vpic/brandsDto.model";
import { BrandDto } from "src/app/models/dtos/vpic/brandDto.model";
import { Brands, IBrands } from "src/app/models/internals/vpic/brands.model";
import { BrandTypesDto } from "src/app/models/dtos/vpic/brandTypesDto.model";
import { BrandType, BrandTypes, IBrandTypes } from "src/app/models/internals/vpic/brandTypes.model";
import { BrandTypeDto } from "src/app/models/dtos/vpic/brandTypeDto.model";

export class BrandAdapter implements Adapter<IBrand> {
    adapt(brand: BrandDto): IBrand {
      return new Brand(
        brand.Country, 
        brand.Mfr_ID,
        brand.Mfr_Name,
        brand.VehicleTypes,
        brand.Mfr_CommonName,
        )
    }
}
  
export class BrandsAdapter implements Adapter<IBrands> {
    adapt(
        {page, brands, results}: 
        {page: number, brands: BrandsDto, results: IBrand[]}): IBrands {
        return new Brands(
            brands.Count,
            page,
            brands.Message,
            brands.SearchCriteria,
            results
        )
    }
}

export class BrandTypesAdapter implements Adapter<IBrandTypes> {
    adapt(brandTypes: BrandTypesDto): IBrandTypes {
        return new BrandTypes(
            brandTypes.Results.map((brandType: BrandTypeDto) => {
                return new BrandType(brandType.name)
            })
        )
      }
}