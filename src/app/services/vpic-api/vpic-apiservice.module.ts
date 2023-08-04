import { NgModule } from '@angular/core';
import { VpicApiService } from './vpic-api.service';
import { BrandAdapter, BrandTypesAdapter, BrandsAdapter } from 'src/app/adapters/vpic/vpic.adapter';

const adapters = [BrandAdapter, BrandsAdapter, BrandTypesAdapter]

@NgModule({
  declarations: [],
  providers: [
    VpicApiService,
    adapters,
  ],
  bootstrap: []
})
export class VpicServiceModule { }
