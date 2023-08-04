import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { VpicServiceModule } from 'src/app/services/vpic-api/vpic-apiservice.module';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(featureData, DataReducer),
    VpicServiceModule
  ],
})
export class UseBrandsModule { }
