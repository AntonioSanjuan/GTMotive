export interface VpicResponseDto<T> {
    Count: number
    Message: string
    SearchCriteria: string
    Results: T[]
}