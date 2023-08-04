import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UseBrands } from 'src/app/hooks/useBrands/useBrands.service';
import { IBrand } from 'src/app/models/internals/vpic/brand.model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private useBrands: UseBrands) {}
  public brand$!: Observable<IBrand | undefined>

  ngOnInit(): void {
    this.brand$ = this.useBrands.getBrandById$(
      Number(this.activatedRoute.snapshot.paramMap.get('id'))
    )
  }
}
