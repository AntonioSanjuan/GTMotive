import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { BrandListFilterComponent } from './brand-list-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UseBrands } from 'src/app/hooks/useBrands/useBrands.service';
import { useBrandsMock } from 'src/app/hooks/useBrands/useBrands.service.mock';
import { IBrands } from 'src/app/models/internals/vpic/brands.model';
import { of, map } from "rxjs"

describe('BrandListFilterComponent', () => {
  let component: BrandListFilterComponent;
  let fixture: ComponentFixture<BrandListFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandListFilterComponent],
      imports: [SharedModule],
      providers: [{
        provide: UseBrands,
        useValue: useBrandsMock
      }]
    });
    fixture = TestBed.createComponent(BrandListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
