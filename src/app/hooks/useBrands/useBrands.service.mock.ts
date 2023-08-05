import { of } from "rxjs"
import { UseBrands } from "./useBrands.service"
import { IBrands } from "src/app/models/internals/vpic/brands.model"
import { IModels } from "src/app/models/internals/vpic/models.model"

export const useBrandsMock: Partial<UseBrands> = {
  getNextBrandsPage: jest.fn(),
  getBrandsById: jest.fn((brandId: number) => of(undefined)),
  getBrands: jest.fn(() => of(undefined)),
  getBrandDetails: jest.fn(() => of({} as IModels)),
  brands$: of<IBrands | undefined>(undefined),
  loading$: of<boolean>(false)
}