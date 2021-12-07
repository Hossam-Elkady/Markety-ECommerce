import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Product } from '../shared/product';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,OnDestroy {

  name:any;
  products!:Product[]
  paramsSubscription!: Subscription;
  constructor(private _ApiService: ApiService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSubscription = this._ActivatedRoute.params.subscribe(params => {
      this.name = params['name'];

      this.getCatProducts(this.name)
    });
  }

  getCatProducts(name:any){

    this._ApiService.categoryProducts(name).subscribe(e =>{
      this.products = e
    })

  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
