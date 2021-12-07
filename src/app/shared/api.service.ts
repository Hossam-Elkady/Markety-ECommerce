import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private _http: HttpClient) { }

  getAllProducts() {
    return this._http
      .get(`https://fakestoreapi.com/products`)
      .pipe(map((e: any) => {
        let response: Product[] = JSON.parse(JSON.stringify(e))
        return response
      }));
  }

  getProductDetails(id:any){
    return this._http
    .get(`https://fakestoreapi.com/products/${id}`)
    .pipe(map((e: any) => {
      let response: Product = JSON.parse(JSON.stringify(e))
      return response
    }));
  }
  categoryProducts(name:string){
    return this._http
      .get(`https://fakestoreapi.com/products/category/${name}`)
      .pipe(map((e) => {
        let response:Product[] = JSON.parse(JSON.stringify(e))
        return response
      }));
  }
}
