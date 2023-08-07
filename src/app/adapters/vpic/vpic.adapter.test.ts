import { TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BrandAdapter, BrandsAdapter, ModelsAdapter } from './vpic.adapter';
import { BrandDto } from 'src/app/models/dtos/vpic/brandDto.model';
import { Brand, IBrand } from 'src/app/models/internals/vpic/brand.model';
import { Brands, IBrands } from 'src/app/models/internals/vpic/brands.model';
import { BrandsDto } from 'src/app/models/dtos/vpic/brandsDto.model';
import { ModelDto } from 'src/app/models/dtos/vpic/modelDto.model';
import { IModels, Models } from 'src/app/models/internals/vpic/models.model';

describe(`Adapters`, () => {
  let brandAdapter: BrandAdapter
  let brandsAdapter: BrandsAdapter
  let modelsAdapter: ModelsAdapter

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
    });

    brandAdapter = new  BrandAdapter()
    brandsAdapter = new BrandsAdapter()
    modelsAdapter = new ModelsAdapter()

  });

  it('BrandAdapter should return Brand obj', () => {
    const inputBrandSut = {
        Country: 'CountryTest',
        Mfr_CommonName: 'Mfr_CommonNameTest',
        Mfr_ID: 0,
        Mfr_Name: 'Mfr_NameTest',
        VehicleTypes: [
            {
                IsPrimary: true,
                Name: 'NameTest'
            }
        ]
    } as BrandDto

    const outputBrand = brandAdapter.adapt(inputBrandSut)
    expect(outputBrand).toBeInstanceOf(Brand)
  });

  it('BrandAdapter should return right output obj', () => {
    const inputBrandSut = {
        Country: 'CountryTest',
        Mfr_CommonName: 'Mfr_CommonNameTest',
        Mfr_ID: 0,
        Mfr_Name: 'Mfr_NameTest',
        VehicleTypes: [
            {
                IsPrimary: true,
                Name: 'NameTest'
            }
        ]
    } as BrandDto

    const outputBrandSut = {
        country: 'CountryTest',
        mfr_CommonName: 'Mfr_CommonNameTest',
        mfr_ID: 0,
        mfr_Name: 'Mfr_NameTest',
        vehicleTypes: [
            {
                IsPrimary: true,
                Name: 'NameTest'
            }
        ]
    } as IBrand


    const outputBrand = brandAdapter.adapt(inputBrandSut)
    expect(outputBrand).toEqual(outputBrandSut)
  });

  it('BrandsAdapter should return Brand obj', () => {
    const inputBrandsSut = {
        Count: 0, 
        Message: 'MessageTest',
        SearchCriteria: 'SearchCriteriaTest',
        Results: [
            {
                Country: 'CountryTest',
                Mfr_CommonName: 'Mfr_CommonNameTest',
                Mfr_ID: 0,
                Mfr_Name: 'Mfr_NameTest',
                VehicleTypes: [
                    {
                        IsPrimary: true,
                        Name: 'NameTest'
                    }
                ]
            } as BrandDto
        ]
    } as BrandsDto

    const outputBrand = brandsAdapter.adapt({
        page: 10,
        searchCriteria: 0,
        brands: inputBrandsSut,
        results: inputBrandsSut.Results.map((brand) => brandAdapter.adapt(brand))
    })
    expect(outputBrand).toBeInstanceOf(Brands)
  });

  it('BrandsAdapter should return right output obj', () => {
    const currentPageSut = 10;
    const searchCriteriaSut = 123

    const inputBrandsSut = {
        Count: 0, 
        Message: 'MessageTest',
        SearchCriteria: `${searchCriteriaSut}`,
        Results: [
            {
                Country: 'CountryTest',
                Mfr_CommonName: 'Mfr_CommonNameTest',
                Mfr_ID: 0,
                Mfr_Name: 'Mfr_NameTest',
                VehicleTypes: [
                    {
                        IsPrimary: true,
                        Name: 'NameTest'
                    }
                ]
            } as BrandDto
        ]
    } as BrandsDto

    const outputBrandsSut = {
        count: 0,
        message: 'MessageTest',
        searchCriteria: searchCriteriaSut,
        currentPage: currentPageSut,
        results: [
            {
                country: 'CountryTest',
                mfr_CommonName: 'Mfr_CommonNameTest',
                mfr_ID: 0,
                mfr_Name: 'Mfr_NameTest',
                vehicleTypes: [
                    {
                        IsPrimary: true,
                        Name: 'NameTest'
                    }
                ]
            } as IBrand
        ]
    } as IBrands


    const outputBrand = brandsAdapter.adapt(
        {
            page: currentPageSut,
            brands: inputBrandsSut,
            results: inputBrandsSut.Results.map((brand) => brandAdapter.adapt(brand)),
            searchCriteria: searchCriteriaSut
        }
        )
    expect(outputBrand).toEqual(outputBrandsSut)
  });

  it('ModelsAdapter should return Brand obj', () => {
    const inputModelsSut = [
        {
            Make_ID: 0,
            Make_Name: 'Make_NameTest0',
            Model_ID: 0,
            Model_Name: 'Model_NameTest0'
        },
        {
            Make_ID: 1,
            Make_Name: 'Make_NameTest1',
            Model_ID: 1,
            Model_Name: 'Model_NameTest1'
        },    
    ] as ModelDto[]

    const modelsOutput = modelsAdapter.adapt({
        results: inputModelsSut
    })
    expect(modelsOutput).toBeInstanceOf(Models)
  });

  it('BrandsAdapter should return right output obj', () => {
    const inputModelsSut = [
        {
            Make_ID: 0,
            Make_Name: 'Make_NameTest0',
            Model_ID: 0,
            Model_Name: 'Model_NameTest0'
        },
        {
            Make_ID: 1,
            Make_Name: 'Make_NameTest1',
            Model_ID: 1,
            Model_Name: 'Model_NameTest1'
        },    
    ] as ModelDto[]

    const outputModelsSut = {
        data: [
            {
                make_ID: 0,
                make_Name: 'Make_NameTest0',
                model_ID: 0,
                model_Name: 'Model_NameTest0'
            },
            {
                make_ID: 1,
                make_Name: 'Make_NameTest1',
                model_ID: 1,
                model_Name: 'Model_NameTest1'
            },    
        ]
    } as IModels

    const modelsOutput = modelsAdapter.adapt({
        results: inputModelsSut
    })
    expect(modelsOutput).toEqual(outputModelsSut)
  });
});
