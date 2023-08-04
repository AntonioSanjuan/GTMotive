export interface IBrandType {
    name: string
}

export class BrandType implements IBrandType {
    name: string;
    constructor(name: any) {
        this.name = name;
    }
}

export interface IBrandTypes {
    data: IBrandType[]
}

export class BrandTypes implements IBrandTypes {
    data: IBrandType[]
    constructor(brandTypes: IBrandType[]) {
        this.data = brandTypes;
    }
} 