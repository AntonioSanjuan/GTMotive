import { Observable, of } from "rxjs"
import { VpicApiService } from "./vpic-api.service"
import { IBrands } from "src/app/models/internals/vpic/brands.model"
import { IModels } from "src/app/models/internals/vpic/models.model"
import { IModel } from "src/app/models/internals/vpic/model.model copy"

export const VpicApiServiceMock: Partial<VpicApiService> = {
  getBrands: jest.fn((): Observable<IBrands> => {
    return of(getBrandsResponseMock)
  }),
  getBrandsById: jest.fn((brandId: number) => {
    return of(getBrandsResponseMock)
  }),
  getBrandDetails: jest.fn((brandId: number) => {
    return of(getBrandDetailsResponseMock)
  })
}

const getBrandDetailsResponseMock: IModels = {
  data: [
    {
      make_ID: 0,
      make_Name: 'make_NameTest0',
      model_ID: 0,
      model_Name: 'model_NameTest0',
    } as IModel,
    {
      make_ID: 1,
      make_Name: 'make_NameTest1',
      model_ID: 1,
      model_Name: 'model_NameTest1',
    } as IModel
  ]
}

const getBrandsResponseMock: IBrands = {
  count: 5,
  currentPage: 1,
  message: 'messageTest',
  searchCriteria: 123,
  results: [
    {
      mfr_ID: 0,
      country: 'countryTest0',
      mfr_Name: 'mfr_NameTest0',
      mfr_CommonName: 'mfr_CommonNameTest0',
      vehicleTypes: [
        {
          Name: 'vehicleTypeNameTest0',
          IsPrimary: true
        }
      ],
    },
    {
      mfr_ID: 1,
      country: 'countryTest1',
      mfr_Name: 'mfr_NameTest1',
      mfr_CommonName: 'mfr_CommonNameTest1',
      vehicleTypes: [
        {
          Name: 'vehicleTypeNameTest1',
          IsPrimary: true
        }
      ],
    },
    {
      mfr_ID: 2,
      country: 'countryTest2',
      mfr_Name: 'mfr_NameTest2',
      mfr_CommonName: 'mfr_CommonNameTest2',
      vehicleTypes: [
        {
          Name: 'vehicleTypeNameTest2',
          IsPrimary: true
        }
      ],
    },
    {
      mfr_ID: 3,
      country: 'countryTest3',
      mfr_Name: 'mfr_NameTest3',
      mfr_CommonName: 'mfr_CommonNameTest3',
      vehicleTypes: [
        {
          Name: 'vehicleTypeNameTest3',
          IsPrimary: true
        }
      ],
    },
    {
      mfr_ID: 4,
      country: 'countryTest4',
      mfr_Name: 'mfr_NameTest4',
      mfr_CommonName: 'mfr_CommonNameTest4',
      vehicleTypes: [
        {
          Name: 'vehicleTypeNameTest4',
          IsPrimary: true
        }
      ],
    },
  ]
}