import { Component, Input } from '@angular/core';
import { IBrand } from 'src/app/models/internals/vpic/brand.model';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent {
  @Input() public brand!: IBrand |undefined;
  @Input() public isLoading!: boolean;

}
