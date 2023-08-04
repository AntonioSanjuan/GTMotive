import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UseBrands } from './useBrands.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRootState } from 'src/app/store/store';
import { selectBrands } from 'src/app/store/data/data.selectors';
import { first, last, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { addBrandsAction, setBrandsAction } from 'src/app/store/data/data.actions';
import { VpicApiService } from 'src/app/services/vpic-api/vpic-api.service';
import { VpicApiServiceMock } from 'src/app/services/vpic-api/vpic-api.service.mock';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';

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

  it('prefetchBrands should fetch from storage if it exists', (done) => {
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

    component.useBrands.prefetchBrands().pipe(take(1)).subscribe((brands: IBrands | undefined) => {
      expect(brands).toBe(storedBrands);
      expect(getBrandsSpy).not.toHaveBeenCalled()

      done()
    })

  });

  it('prefetchBrands should fetch from service & store it, if doesnt exists stored brands', (done) => {
    //set storage
    const fetchedBrands = {
      currentPage: 0,
      results: [
        {}, {}
      ]
    } as IBrands;

    const getBrandsSpy = jest.spyOn(VpicApiServiceMock, 'getBrands').mockReturnValue(of(fetchedBrands))
    const dispatchSpy = jest.spyOn(store, 'dispatch')

    component.useBrands.prefetchBrands().pipe(take(1)).subscribe((brands: IBrands | undefined) => {
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
    
    component.useBrands.fetchNextBrands();

    component.useBrands.brands$.pipe(take(5)).subscribe((brands: IBrands | undefined) => {
      expect(getBrandsSpy).toHaveBeenCalledWith(sutStoredBrandsPage + 1)
      expect(dispatchSpy).toHaveBeenCalledWith(addBrandsAction(fetchedBrands))
      done()
    })
  });
});

