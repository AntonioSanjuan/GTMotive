import { Observable, of } from "rxjs"
import { VpicApiService } from "./vpic-api.service"
import { IBrands } from "src/app/models/internals/vpic/brands.model"
import { IBrandTypes } from "src/app/models/internals/vpic/brandTypes.model"

export const VpicApiServiceMock: Partial<VpicApiService> = {
  getBrands: jest.fn((): Observable<IBrands> => {
    return of(getBrandsResponseMock)
  }),
  getBrandTypes: jest.fn((): Observable<IBrandTypes> => {
    return of(getBrandTypesResponseMock)
  })
}

const getBrandsResponseMock: IBrands = {
  count: 5,
  currentPage: 1,
  message: 'messageTest',
  searchCriteria: 'searchCriteriaTest',
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

const getBrandTypesResponseMock: IBrandTypes = {
  data: [
    {
      name: 'type0',
    },
    {
      name: 'type1'
    },
    {
      name: 'type2'
    },
    {
      name: 'type3'
    },
    {
      name: 'type4'
    },
    {
      name: 'type5'
    },
  ]
}