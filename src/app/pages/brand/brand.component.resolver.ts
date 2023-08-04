import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { UseBrands } from "src/app/hooks/useBrands/useBrands.service";

export const brandDetailsResolver: ResolveFn<any> =
    (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,
        useBrands: UseBrands = inject(UseBrands),
    ): Observable<any> => {
        const brandId = route.paramMap.get('id')
        return useBrands.prefetchBrandById(Number(brandId)).pipe(
            switchMap((brands) => {
                return useBrands.fetchBrandDetails(Number(brandId))
            })
        )
    };