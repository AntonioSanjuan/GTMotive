import { ModelDto } from "../../dtos/vpic/modelDto.model";
import { IModel, Model } from "./model.model copy"

export interface IModels {
    data: IModel[]
}

export class Models implements IModels {
    data: IModel[]
    constructor(models: ModelDto[]) {
        this.data = models.map((model: ModelDto) => 
            {return new Model(
                model.Make_ID,
                model.Make_Name,
                model.Model_ID,
                model.Model_Name
            )}
        );
    }
} 