import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UseBrands } from './useBrands.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRootState } from 'src/app/store/store';
import { selectBrands } from 'src/app/store/data/data.selectors';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';
import { addBrandsAction, setBrandsAction } from 'src/app/store/data/data.actions';
import { VpicApiService } from 'src/app/services/vpic-api/vpic-api.service';
import { VpicApiServiceMock } from 'src/app/services/vpic-api/vpic-api.service.mock';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';
import { IModels } from 'src/app/models/internals/vpic/models.model';

@Component({})
class DummyComponent {
  constructor(public useBrands: UseBrands) {}
}

describe('UseBrands', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let store: MockStore<AppRootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      providers: [
        UseBrands,
        provideMockStore<AppRootState>({
          initialState: undefined,
          selectors: [
            {
              selector: selectBrands,
              value: undefined
            }
          ]
        }),
        { provide: VpicApiService, useValue: VpicApiServiceMock },
      ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('loading$ should be false by default', () => {
    component.useBrands.loading$.pipe(take(1)).subscribe((loading) => {
      expect(loading).toBeFalsy()
    })
  });

  it('brands$ should be undefined by default', () => {
    component.useBrands.brands$.pipe(take(1)).subscribe((brands) => {
      expect(brands).toBeUndefined()
    })
  });

  it('brands$ should has the last stored brands state', () => {
    //set storage
    const storedBrands = {
      currentPage: 1,
      results: [
        {}, {}
      ]
    } as IBrands;

    store.overrideSelector(selectBrands, storedBrands);
    store.refreshState();
    fixture.detectChanges()
    
    component.useBrands.brands$.pipe(take(1)).subscribe((brands) => {
      expect(brands).toEqual(storedBrands)
    })
  });

  it('getBrands should fetch from storage if it exists', (done) => {
    //set storage
    const storedBrands = {
      currentPage: 1,
      results: [
        {}, {}
      ]
    } as IBrands;

    const getBrandsSpy = jest.spyOn(VpicApiServiceMock, 'getBrands')

    store.overrideSelector(selectBrands, storedBrands);
    store.refreshState();
    fixture.detectChanges()

    component.useBrands.getBrands().pipe(take(1)).subscribe((brands: IBrands | undefined) => {
      expect(brands).toBe(storedBrands);
      expect(getBrandsSpy).not.toHaveBeenCalled()

      done()
    })

  });

  it('getBrands should fetch from service & store it, if doesnt exists stored brands', (done) => {
    //set storage
    const fetchedBrands = {
      currentPage: 0,
      results: [
        {}, {}
      ]
    } as IBrands;

    const getBrandsSpy = jest.spyOn(VpicApiServiceMock, 'getBrands').mockReturnValue(of(fetchedBrands))
    const dispatchSpy = jest.spyOn(store, 'dispatch')

    component.useBrands.getBrands().pipe(take(1)).subscribe((brands: IBrands | undefined) => {
      expect(brands).toBe(fetchedBrands);
      expect(getBrandsSpy).toHaveBeenCalledWith(1)
      expect(dispatchSpy).toHaveBeenCalledWith(setBrandsAction(fetchedBrands))
      done()
    })
  });

  it('fetchNextBrands should fetch from service the next page based on stored brands', (done) => {
    //set storage
    const sutStoredBrandsPage = 2
    const storedBrands = {
      currentPage: sutStoredBrandsPage,
      results: [
        {}, {}
      ]
    } as IBrands;

    const fetchedBrands = {
      currentPage: sutStoredBrandsPage + 1,
      results: [
        {}, {}
      ]
    } as IBrands;

    store.overrideSelector(selectBrands, storedBrands);
    store.refreshState();
    fixture.detectChanges()

    const getBrandsSpy = jest.spyOn(VpicApiServiceMock, 'getBrands').mockReturnValue(of(fetchedBrands))
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    
    component.useBrands.getNextBrandsPage();

    component.useBrands.brands$.pipe(take(5)).subscribe((brands: IBrands | undefined) => {
      expect(getBrandsSpy).toHaveBeenCalledWith(sutStoredBrandsPage + 1)
      expect(dispatchSpy).toHaveBeenCalledWith(addBrandsAction(fetchedBrands))
      done()
    })
  });

  //to-do
  it('getBrandsById should fetch from storage if it exists', (done) => {
    //set storage
    const brandIdSut = 123
    const storedBrands = {
      currentPage: 1,
      results: [
        {
          mfr_ID: brandIdSut
        },
        {
          mfr_ID: 0
        }
      ]
    } as IBrands;

    const getBrandsByIdSpy = jest.spyOn(VpicApiServiceMock, 'getBrandsById')


    store.overrideSelector(selectBrands, storedBrands);
    store.refreshState();
    fixture.detectChanges()

    component.useBrands.getBrandsById(brandIdSut).pipe(take(1)).subscribe((brands: IBrands | undefined) => {
      expect(brands).toBe(storedBrands);
      expect(getBrandsByIdSpy).not.toHaveBeenCalled()

      done()
    })

  });

  it('getBrandsById should fetch from service if doesnt exists in the storage', (done) => {
    //set storage
    const brandIdSut = 123
    const storedBrands = {
      currentPage: 1,
      results: [
        {
          mfr_ID: 0
        },
        {
          mfr_ID: 1
        }
      ]
    } as IBrands;

    const getBrandsByIdSpy = jest.spyOn(VpicApiServiceMock, 'getBrandsById')


    store.overrideSelector(selectBrands, storedBrands);
    store.refreshState();
    fixture.detectChanges()

    component.useBrands.getBrandsById(brandIdSut).pipe(take(1)).subscribe((brands: IBrands | undefined) => {
      expect(getBrandsByIdSpy).toHaveBeenCalled()

      done()
    })
  });

  it('getBrandDetails should fetch from storage if exists', (done) => {
    //set storage
    const brandIdSut = 123
    const storedBrands = {
      currentPage: 1,
      results: [
        {
          mfr_ID: 0
        },
        {
          mfr_ID: brandIdSut,
          models: {
            data: [
              {
                make_ID: 0,
                make_Name: 'make_NameTest0',
                model_ID: 0,
                model_Name: 'model_NameTest0'
              }
            ]
          }
        }
      ]
    } as IBrands;

    const getBrandsDetailsSpy = jest.spyOn(VpicApiServiceMock, 'getBrandDetails')


    store.overrideSelector(selectBrands, storedBrands);
    store.refreshState();
    fixture.detectChanges()

    component.useBrands.getBrandDetails(brandIdSut).pipe(take(1)).subscribe((models: IModels) => {
      expect(getBrandsDetailsSpy).not.toHaveBeenCalled()

      done()
    })
  });

  it('getBrandDetails should fetch from service if doesnt exists in the storage', (done) => {
    //set storage
    const brandIdSut = 123
    const brandModelSut = {
      data: [
        {
          make_ID: 0,
          make_Name: 'make_NameTest0',
          model_ID: 0,
          model_Name: 'model_NameTest0'
        }
      ]
    }
    const storedBrands = {
      currentPage: 1,
      results: [
        {
          mfr_ID: 0
        },
        {
          mfr_ID: 1,
          models: brandModelSut
        }
      ]
    } as IBrands;

    const getBrandsDetailsSpy = jest.spyOn(VpicApiServiceMock, 'getBrandDetails')


    store.overrideSelector(selectBrands, storedBrands);
    store.refreshState();
    fixture.detectChanges()

    component.useBrands.getBrandDetails(brandIdSut).pipe(take(1)).subscribe((models: IModels) => {
      expect(getBrandsDetailsSpy).toHaveBeenCalled()

      done()
    })
  });
  
});

