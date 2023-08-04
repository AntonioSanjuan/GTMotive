import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

import { BrandsDto } from 'src/app/models/dtos/vpic/brandsDto.model';
import { BrandAdapter, BrandTypesAdapter, BrandsAdapter, ModelsAdapter } from 'src/app/adapters/vpic/vpic.adapter';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';
import { IBrandTypes } from 'src/app/models/internals/vpic/brandTypes.model';
import { BrandTypesDto } from 'src/app/models/dtos/vpic/brandTypesDto.model';
import { MakesDto } from 'src/app/models/dtos/vpic/makesDto.model';
import { MakeDto } from 'src/app/models/dtos/vpic/makeDto.model';
import { ModelsDto } from 'src/app/models/dtos/vpic/modelsDto.model';
import { IModels } from 'src/app/models/internals/vpic/models.model';

@Injectable()
export class VpicApiService {

  constructor(
    private http: HttpClient,
    private brandAdapt: BrandAdapter,
    private brandsAdapt: BrandsAdapter,
    private modelsAdapt: ModelsAdapter,
    private brandTypesAdapt: BrandTypesAdapter,
    ) {}

  private getRawBrands(page: number): Observable<BrandsDto> {
    return this.http.get<BrandsDto>(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=${page}`)
  }

  private getRawBrandsById(brandId: number): Observable<BrandsDto> {
    return this.http.get<BrandsDto>(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${brandId}?format=json`)
  }

  private getRawBrandMakes(brandId: number): Observable<MakesDto> {
    return this.http.get<MakesDto>(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/${brandId}?format=json`)
  }

  private getRawMakeModels(makeName: string): Observable<ModelsDto> {
    return this.http.get<ModelsDto>(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${makeName}?format=json`)
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
  public getBrandsById(brandId: number): Observable<IBrands> {
    return this.getRawBrandsById(brandId).pipe(
      map((data: BrandsDto) => {
        const output = this.brandsAdapt.adapt(
          {
            page: 0,
            brands: data, 
            results: data.Results.map((result) => { return this.brandAdapt.adapt(result)})
          }
        )
        return output
      }),
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

  public getBrandDetails(brandId: number): Observable<IModels> {
    return this.getRawBrandMakes(brandId).pipe(
      switchMap((makes: MakesDto) => {
        const requests = makes.Results
            .map((make: MakeDto) => 
                this.getRawMakeModels(make.Make_Name)
            )
        return forkJoin<ModelsDto[]>(requests)
    }),
    map((models: ModelsDto[]) => {
      const modelsToAdapt = models.map((models) => {return models.Results}).flat()
        const output = this.modelsAdapt.adapt(
          {
            results: modelsToAdapt
          }
        )
        return output;
    })
    )
  }
}
