import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { itemsData } from './shared/itemsData.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) { }

  email: string = JSON.stringify(sessionStorage.getItem('MarketyEmail'));

  postCartItem(itemData: itemsData) {
    return this._http.post(
      `https://markety-8c094-default-rtdb.europe-west1.firebasedatabase.app/${this.email}.json`,
      itemData
    );
  }

  getCartItems(email: string) {
    return this._http.get(
      `https://markety-8c094-default-rtdb.europe-west1.firebasedatabase.app/${email}.json`
    ).pipe(
      map((e: any) => {
        const response: itemsData[] = [];
        for (const key in e) {
          if (e.hasOwnProperty(key)) {
            response.push({ ...e[key], fireBaseId: key });
          }
        }
        return response;
      })
    );
  }

  getSingelItem(itemsId: number) {
    return this._http.get(`https://fakestoreapi.com/products/${itemsId}`);
  }

  getCount(email: string, fireBaseId: any) {
    return this._http.get(`https://markety-8c094-default-rtdb.europe-west1.firebasedatabase.app/${email}/${fireBaseId}/count.json`)
  }

  updateItemCounter(email: string, fireBaseId: any, count: number) {
    return this._http.put(
      `https://markety-8c094-default-rtdb.europe-west1.firebasedatabase.app/${email}/${fireBaseId}/count.json`, count
    )
  }
  deleteItemFromCart(fireBaseId: any) {
    return this._http.delete(
      `https://markety-8c094-default-rtdb.europe-west1.firebasedatabase.app/${this.email}/${fireBaseId}.json`
    )
  }
}
