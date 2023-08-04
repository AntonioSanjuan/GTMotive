import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from "rxjs";
import { finalize, take, tap } from 'rxjs/operators';
import { DataState } from 'src/app/store/data/models/data.state';
import { setBrandTypesAction } from 'src/app/store/data/data.actions';
import { IBrandTypes } from 'src/app/models/internals/vpic/brandTypes.model';
import { VpicApiService } from 'src/app/services/vpic-api/vpic-api.service';
import { selectBrandTypes } from 'src/app/store/data/data.selectors';

@Injectable()
export class UseBrandTypes {
  private loadingObj = new BehaviorSubject<boolean>(false)
  private brandTypesObj = new BehaviorSubject<IBrandTypes | undefined>(undefined)

  public get loading$() {
    return this.loadingObj.asObservable()
  }
  public get brandTypes$() {
    return this.brandTypesObj.asObservable()
  }

  constructor(
    private store: Store<DataState>, 
    private vpicService: VpicApiService
  ) {
    this.store.select(selectBrandTypes)
      .subscribe((storedBrandTypes) => {
        this.brandTypesObj.next(storedBrandTypes)
      })
  }

  private getStoredBrandTypes(): IBrandTypes | undefined { return this.brandTypesObj.value}

  private fetchFromStore(): Observable<IBrandTypes | undefined> {
    return this.brandTypes$.pipe(
      take(1),
    )
  }
  
  private fetchFromService(): Observable<IBrandTypes | undefined> {
    return this.vpicService.getBrandTypes().pipe(
      take(1),
    )
  }

  public prefetchBrandTypes(): Observable<IBrandTypes | undefined> {
    this.loadingObj.next(true)

    return (!!this.getStoredBrandTypes()
    ? this.fetchFromStore() 
    : this.fetchFromService().pipe(
      tap((brandTypes: IBrandTypes | undefined) => {
        //save it into storage
        if(brandTypes) {
          this.store.dispatch(setBrandTypesAction(
            brandTypes
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
