import { of } from "rxjs"
import { UseBrands } from "./useBrands.service"
import { IBrands } from "src/app/models/internals/vpic/brands.model"

export const useBrandsMock: Partial<UseBrands> = {
  prefetchBrands: jest.fn(() => of(undefined)),
  brands$: of<IBrands | undefined>(undefined),
  loading$: of<boolean>(false)
}