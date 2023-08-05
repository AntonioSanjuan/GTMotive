export interface IVpicResponse<T> {
    count: number,
    currentPage: number
    message: string
    results: T[],
    searchCriteria?: number
}

export class VpicResponse<T> implements IVpicResponse<T> {
    constructor(
        public count: number,
        public currentPage: number,
        public message: string,
        public results: T[],
        public searchCriteria?: number,
    ) {}
}
