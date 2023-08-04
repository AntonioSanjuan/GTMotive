import { VpicResponseDto } from "../../dtos/common/vpic/vpicResponseDto.model";
import { VehicleTypeDto } from "../../dtos/vpic/brandDto.model";

export interface IModel {
    make_ID: number,
    make_Name: string,
    model_ID: number,
    model_Name: string,
}

export class Model implements IModel {
    constructor(
        public make_ID: number,
        public make_Name: string,
        public model_ID: number,
        public model_Name: string,
    ) {}
}
