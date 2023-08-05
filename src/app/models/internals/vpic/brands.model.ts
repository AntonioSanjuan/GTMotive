import { VpicResponse } from "../common/vpic/vpicResponse.model";
import { IBrand } from "./brand.model";

export type IBrands = VpicResponse<IBrand>

export class Brands extends VpicResponse<IBrand> implements IBrands {
    constructor(
        count: number,
        currentPage: number,
        message: string,
        results: IBrand[],
        searchCriteria?: number,

    ) {
        super(
            count,
            currentPage,
            message,
            results,
            searchCriteria,
        )
    }
}