import { VpicResponseDto } from "../../dtos/common/vpic/vpicResponseDto.model";
import { VehicleTypeDto } from "../../dtos/vpic/brandDto.model";

export interface IBrand {
    country: string,
    mfr_ID: number,
    mfr_Name: string,
    vehicleTypes: VehicleTypeDto[],
    mfr_CommonName?: string,
}

export class Brand implements IBrand {
    constructor(
        public country: string,
        public mfr_ID: number,
        public mfr_Name: string,
        public vehicleTypes: VehicleTypeDto[],
        public mfr_CommonName?: string,
    ) {}
}
