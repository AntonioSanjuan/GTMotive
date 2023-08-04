export interface IVpicResponse<T> {
    count: number,
    currentPage: number
    message: string
    searchCriteria: string
    results: T[]
}

export class VpicResponse<T> implements IVpicResponse<T> {
    constructor(
        public count: number,
        public currentPage: number,
        public message: string,
        public searchCriteria: string,
        public results: T[]
    ) {}
}
