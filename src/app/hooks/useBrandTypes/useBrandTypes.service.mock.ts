import { of } from "rxjs"
import { UseBrandTypes } from "./useBrandTypes.service"
import { IBrandTypes } from "src/app/models/internals/vpic/brandTypes.model"

export const UseBrandTypesMock: Partial<UseBrandTypes> = {
  prefetchBrandTypes: jest.fn(() => of(undefined)),
  brandTypes$: of<IBrandTypes | undefined>(undefined),
  loading$: of<boolean>(false)
}