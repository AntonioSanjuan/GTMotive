import { Component } from '@angular/core';
import { UseBrands } from 'src/app/hooks/useBrands/useBrands.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent {
  constructor(public useBrands: UseBrands) {}

  public isIntersecting(intersecting: boolean) {
    if(intersecting) {
      console.log("Que pasa aqui")
      this.useBrands.fetchNextBrands()
    }
  }
}
