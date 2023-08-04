import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BrandsDto } from 'src/app/models/dtos/vpic/brandsDto.model';
import { BrandAdapter, BrandTypesAdapter, BrandsAdapter } from 'src/app/adapters/vpic/vpic.adapter';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';
import { IBrandTypes } from 'src/app/models/internals/vpic/brandTypes.model';
import { BrandTypesDto } from 'src/app/models/dtos/vpic/brandTypesDto.model';

@Injectable()
export class VpicApiService {

  constructor(
    private http: HttpClient,
    private brandAdapt: BrandAdapter,
    private brandsAdapt: BrandsAdapter,
    private brandTypesAdapt: BrandTypesAdapter,
    ) {}

  private getRawBrands(page: number): Observable<BrandsDto> {
    return this.http.get<BrandsDto>(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=${page}`)
  }

  private getRawBrandTypes(): Observable<BrandTypesDto> {
    return this.http.get<BrandTypesDto>(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/Manufacture?format=json`)
  }

  public getBrandTypes(): Observable<IBrandTypes> {
    return this.getRawBrandTypes().pipe(
      map((brandTypes: BrandTypesDto) => {
        return this.brandTypesAdapt.adapt(brandTypes)
      })
    )
  }
  public getBrands(page: number): Observable<IBrands> {
    return this.getRawBrands(page).pipe(
      map((data: BrandsDto) => {
        const output = this.brandsAdapt.adapt(
          {
            page: page,
            brands: data, 
            results: data.Results.map((result) => { return this.brandAdapt.adapt(result)})
          }
        )
        return output
      }),
    )
  }
}
