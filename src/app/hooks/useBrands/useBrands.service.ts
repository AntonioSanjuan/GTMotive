import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from "rxjs";
import { addBrandsAction, setBrandDetailsAction, setBrandsAction } from "src/app/store/data/data.actions";
import { finalize, take, tap } from 'rxjs/operators';
import { selectBrandById, selectBrands } from 'src/app/store/data/data.selectors';
import { VpicApiService } from 'src/app/services/vpic-api/vpic-api.service';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';
import { IBrand } from 'src/app/models/internals/vpic/brand.model';
import { IModels } from 'src/app/models/internals/vpic/models.model';

@Injectable()
export class UseBrands {
  private loadingObj = new BehaviorSubject<boolean>(false)
  private brandsObj = new BehaviorSubject<IBrands | undefined>(undefined)
  private searchCriteriaObj = new BehaviorSubject<number | undefined>(undefined)

  public get loading$() {
    return this.loadingObj.asObservable()
  }
  public get brands$() {
    return this.brandsObj.asObservable()
  }
  public get searchCriteria$() {
    return this.searchCriteriaObj.asObservable()
  }

  constructor(
    private store: Store<DataState>, 
    private vpicService: VpicApiService
  ) {
    this.store.select(selectBrands)
      .subscribe((storedBrands) => {
        this.brandsObj.next(storedBrands)
      })
  }
  
  private getStoredBrands(): IBrands|undefined { return this.brandsObj.value}
  private getStoredBrandById(brandId: number): IBrand|undefined { return this.brandsObj.value?.results.filter((brand: IBrand) => { return brand.mfr_ID === brandId})[0]}
  private getNextBrandPage(): number { return this.getStoredBrands() ? this.getStoredBrands()?.currentPage as number + 1 : 1}

  private getBrandsFromStore(): Observable<IBrands|undefined> {
    return this.brands$.pipe(
      take(1),
    )
  }
  
  private getBrandsByIdFromService(brandId: number, saveCriteria: boolean): Observable<IBrands|undefined> {
    return this.vpicService.getBrandsById(brandId, saveCriteria).pipe(
      take(1),
    )
  }

  private getBrandsFromService(page: number): Observable<IBrands|undefined> {
    return this.vpicService.getBrands(page).pipe(
      take(1),
    )
  }

  private getBrandDetailsfromService(brandId: number): Observable<IModels> {
    return this.vpicService.getBrandDetails(brandId).pipe(
      take(1),
    )
  }

  public getNextBrandsPage(shouldAdd: boolean = true): void {
    this.loadingObj.next(true);
    this.searchCriteriaObj.next(undefined)

    this.getBrandsFromService(this.getNextBrandPage()).pipe(
        tap((brands: IBrands|undefined) => {
          if(brands) {
            if(shouldAdd) {
              this.store.dispatch(addBrandsAction(
                brands
              ));
            } else {
              this.store.dispatch(setBrandsAction(
                brands
              ));
            }
          }
      }),
      finalize(() => {
        this.loadingObj.next(false);
      })  
    ).subscribe()
  }

  public getFilteredBrandsById(brandId: number): void {
    this.loadingObj.next(true);
    this.searchCriteriaObj.next(brandId)

    this.getBrandsByIdFromService(brandId, true).pipe(
        tap((brands: IBrands|undefined) => {
          //save it into storage
          if(brands) {
            this.store.dispatch(setBrandsAction(
              brands
            ));
          }
      }),
      finalize(() => {
        this.loadingObj.next(false);
      })  
    ).subscribe()
  }

  public getBrandById$ = (brandId: number): Observable<IBrand | undefined> => {
    return this.store.select(selectBrandById(brandId))
  }
  
  public getBrandsById(brandId: number): Observable<IBrands | undefined> { 
    this.loadingObj.next(true)
    this.searchCriteriaObj.next(undefined)

    return (!!this.getStoredBrandById(brandId)
    ? this.getBrandsFromStore() 
    : this.getBrandsByIdFromService(brandId, false).pipe(
      tap((brands: IBrands | undefined) => {
        //save it into storage
        if(brands) {
          this.store.dispatch(setBrandsAction(
            brands
          ));
        }
      }),
    )).pipe(
      finalize(() => {
        this.loadingObj.next(false);
      })  
    )
  }

  public getBrands(): Observable<IBrands | undefined> {
    this.loadingObj.next(true)
    this.searchCriteriaObj.next(undefined)

    return (!!this.getStoredBrands()
    ? this.getBrandsFromStore() 
    : this.getBrandsFromService(this.getNextBrandPage()).pipe(
      tap((brands: IBrands | undefined) => {
        //save it into storage
        if(brands) {
          this.store.dispatch(setBrandsAction(
            brands
          ));
        }
      }),
    )).pipe(
      finalize(() => {
        this.loadingObj.next(false);
      })  
    )
  }

  public getBrandDetails(brandId: number): Observable<IModels> {
    this.loadingObj.next(true)

    const storedBrandDetails = this.getStoredBrandById(brandId)?.models;

    return storedBrandDetails ?
      of(storedBrandDetails)
      :
      this.getBrandDetailsfromService(brandId).pipe(
        tap((brandDetails: IModels) => {
          //save it into storage
          if(brandDetails) {
            this.store.dispatch(setBrandDetailsAction(
              {
                brandId: brandId,
                brandDetails: brandDetails
              }
            ));
          }
        }),
      ).pipe(
        finalize(() => {
          this.loadingObj.next(false);
        })  
      )
  }
}
