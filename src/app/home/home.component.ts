import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Product } from '../shared/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _ApiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  products: Product[] = []

  getProducts() {
    this._ApiService.getAllProducts().subscribe(e => {
      this.products = e;
    })
  }

}
