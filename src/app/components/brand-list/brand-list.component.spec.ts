import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { BrandListComponent } from './brand-list.component';
import { BrandListFilterComponent } from '../brand-list-filter/brand-list-filter.component';
import { UseBrands } from 'src/app/hooks/useBrands/useBrands.service';
import { useBrandsMock } from 'src/app/hooks/useBrands/useBrands.service.mock';

describe('BrandListComponent', () => {
  let component: BrandListComponent;
  let fixture: ComponentFixture<BrandListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandListComponent, BrandListFilterComponent, IntersectionObserverDirective],
      imports: [SharedModule],
      providers: [{
        provide: UseBrands,
        useValue: useBrandsMock
      }]
    });
    fixture = TestBed.createComponent(BrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not request getNextBrandsPage if is not intersecting', () => {
    const getNextBrandsPageSpy = jest.spyOn(useBrandsMock, 'getNextBrandsPage')

    component.isIntersecting(false)

    expect(getNextBrandsPageSpy).not.toHaveBeenCalled()
  });

  it('should request getNextBrandsPage if is intersecting', () => {
    const getNextBrandsPageSpy = jest.spyOn(useBrandsMock, 'getNextBrandsPage')

    component.isIntersecting(true)

    expect(getNextBrandsPageSpy).toHaveBeenCalled()
  });


});
