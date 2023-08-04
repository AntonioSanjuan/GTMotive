import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BrandListComponent } from 'src/app/components/brand-list/brand-list.component';
import { BrandCardComponent } from 'src/app/components/brand-card/brand-card.component';
import { SkeletonDirective } from 'src/app/directives/skeleton/skeleton.directive';
import { homeResolver } from './home.component.resolver';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { BrandListFilterComponent } from 'src/app/components/brand-list-filter/brand-list-filter.component';
import { UseBrandsModule } from 'src/app/hooks/useBrands/useBrands.service.module';
import { UseBrands } from 'src/app/hooks/useBrands/useBrands.service';
import { UseBrandTypes } from 'src/app/hooks/useBrandTypes/useBrandTypes.service';
import { BrandComponent } from '../brand/brand.component';
import { brandDetailsResolver } from '../brand/brand.component.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, providers: [UseBrands, UseBrandTypes], resolve: {brandsResolver: homeResolver}},
  { path: ':id', component: BrandComponent, providers: [UseBrands], resolve: { brandDetailsResolver: brandDetailsResolver}},
];
const directives = [SkeletonDirective, IntersectionObserverDirective]

@NgModule({
  declarations: [HomeComponent, BrandComponent, BrandListComponent, BrandListFilterComponent, BrandCardComponent, ...directives],
  providers: [],
  imports: [
    SharedModule,
    UseBrandsModule,
    RouterModule.forChild(routes),
  ],
  exports: [SharedModule, ...directives],
})
export class HomeModule {}