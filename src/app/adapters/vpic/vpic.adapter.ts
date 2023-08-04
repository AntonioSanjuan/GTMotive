import { Adapter } from "../common/adapter";
import { Brand, IBrand } from "src/app/models/internals/vpic/brand.model";
import { BrandsDto } from "src/app/models/dtos/vpic/brandsDto.model";
import { BrandDto } from "src/app/models/dtos/vpic/brandDto.model";
import { Brands, IBrands } from "src/app/models/internals/vpic/brands.model";
import { IModels, Models } from "src/app/models/internals/vpic/models.model";
import { ModelDto } from "src/app/models/dtos/vpic/modelDto.model";

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

export class ModelsAdapter implements Adapter<IModels> {
    adapt(
        {results}: 
        {results: ModelDto[]}): IModels {
        return new Models(results)
    }
}