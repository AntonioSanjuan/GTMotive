export interface BrandDto {
    Country: string
    Mfr_CommonName?: string
    Mfr_ID: number
    Mfr_Name: string
    VehicleTypes: VehicleTypeDto[]
}

export interface VehicleTypeDto {
  IsPrimary: boolean
  Name: string
}
