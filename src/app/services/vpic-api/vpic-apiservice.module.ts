import { NgModule } from '@angular/core';
import { VpicApiService } from './vpic-api.service';
import { BrandAdapter, BrandsAdapter, ModelsAdapter } from 'src/app/adapters/vpic/vpic.adapter';

const adapters = [BrandAdapter, BrandsAdapter, ModelsAdapter]

@NgModule({
  declarations: [],
  providers: [
    VpicApiService,
    adapters,
  ],
  bootstrap: []
})
export class VpicServiceModule { }
