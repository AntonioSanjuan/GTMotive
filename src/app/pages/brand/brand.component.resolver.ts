import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { UseBrands } from "src/app/hooks/useBrands/useBrands.service";

export const brandDetailsResolver: ResolveFn<any> =
    (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,
        useBrands: UseBrands = inject(UseBrands),
    ): Observable<any> => {
        const brandId = route.paramMap.get('id')
        return useBrands.fetchBrandDetails(Number(brandId))
    };