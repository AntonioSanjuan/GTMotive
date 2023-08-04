import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of, forkJoin } from "rxjs";
import { UseBrands } from "src/app/hooks/useBrands/useBrands.service";
import { IBrands } from "src/app/models/internals/vpic/brands.model";


interface IHomeResolver {
    brands: IBrands | undefined,
}

export const homeResolver: ResolveFn<any> =
    (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,
        useBrands: UseBrands = inject(UseBrands),

    ): Observable<IBrands | undefined> => {
        return useBrands.prefetchBrands()
    };