import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from "rxjs";
import { addBrandsAction, setBrandsAction } from "src/app/store/data/data.actions";
import { finalize, take, tap } from 'rxjs/operators';
import { selectBrands } from 'src/app/store/data/data.selectors';
import { VpicApiService } from 'src/app/services/vpic-api/vpic-api.service';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';

@Injectable()
export class UseBrands {
  private loadingObj = new BehaviorSubject<boolean>(false)
  private brandsObj = new BehaviorSubject<IBrands | undefined>(undefined)

  public get loading$() {
    return this.loadingObj.asObservable()
  }
  public get brands$() {
    return this.brandsObj.asObservable()
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
  private getNextPage(): number { return this.getStoredBrands() ? this.getStoredBrands()?.currentPage as number + 1 : 1}

  private fetchFromStore(): Observable<IBrands|undefined> {
    return this.brands$.pipe(
      take(1),
    )
  }
  
  private fetchFromService(page: number): Observable<IBrands|undefined> {
    return this.vpicService.getBrands(page).pipe(
      take(1),
    )
  }

  public fetchNextBrands(): void {
    this.loadingObj.next(true);

    this.fetchFromService(this.getNextPage()).pipe(
        tap((brands: IBrands|undefined) => {
          //save it into storage
          if(brands) {
            this.store.dispatch(addBrandsAction(
              brands
            ));
          }
      }),
      finalize(() => {
        this.loadingObj.next(false);
      })  
    ).subscribe()
  }

  public prefetchBrands(): Observable<IBrands | undefined> {
    this.loadingObj.next(true)

    return (!!this.getStoredBrands()
    ? this.fetchFromStore() 
    : this.fetchFromService(this.getNextPage()).pipe(
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
}
