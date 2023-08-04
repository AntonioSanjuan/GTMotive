import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of, forkJoin } from "rxjs";
import { UseBrandTypes } from "src/app/hooks/useBrandTypes/useBrandTypes.service";
import { UseBrands } from "src/app/hooks/useBrands/useBrands.service";
import { IBrandTypes } from "src/app/models/internals/vpic/brandTypes.model";
import { IBrands } from "src/app/models/internals/vpic/brands.model";


interface IHomeResolver {
    brands: IBrands | undefined,
    brandTypes: IBrandTypes | undefined
}

export const homeResolver: ResolveFn<any> =
    (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,
        useBrands: UseBrands = inject(UseBrands),
        useBrandTypes: UseBrandTypes = inject(UseBrandTypes)

    ): Observable<IHomeResolver> => {
        return forkJoin({
            brands: useBrands.prefetchBrands(),
            brandTypes: useBrandTypes.prefetchBrandTypes()
        }).pipe(
            catchError((error) => {
                return of({} as IHomeResolver)
            })
        )
    };