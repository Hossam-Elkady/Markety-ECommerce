import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ApiService } from '../shared/api.service';
import { itemsData } from '../shared/itemsData.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private _ApiService: ApiService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService) { }
  id: number = 0;
  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params.id;
    this.getDetails();
    for (let i = 0; i < 30; i++) {
      this.items.push(i)
    }

  }

  holdinstal: any;

  details: any = "";

  instalment: any;

  instalmentPerMonth: number = 0;

  items: number[] = [];

  uniqueArray: number[] = []

  itemsData: itemsData = {
    id: this.id,
    count: 1
  }

  getAllData() {
    document.querySelector(".notification")?.classList.remove("d-none")
    this._CartService.getCartItems(JSON.stringify(sessionStorage.getItem("MarketyEmail"))).subscribe(res => {
      if (res.length == 0) {
        this.addToCart()
      }
      else {
        res.forEach(item => {
          if (this.itemsData.id == item.id) {
            this._CartService.updateItemCounter(JSON.stringify(sessionStorage.getItem("MarketyEmail")), item.fireBaseId, ++item.count).subscribe(response => {
            })
            return
          }
          else {
            this.addToCart()
          }
        })
      }
    })
  }
  hideNotification(){
    document.querySelector(".notification")?.classList.add("d-none")
  }
  addToCart() {
    if (sessionStorage.getItem("MarketyEmail")) {
      this.itemsData = {
        id: this.id,
        count: 1
      }
      this._CartService.postCartItem(this.itemsData).subscribe(e => {
      })
    }
    else {
      this._Router.navigateByUrl("/login")
    }
  }

  getDetails() {
    this._ApiService.getProductDetails(this.id).subscribe(res => {
      this.details = res;
      this.instalment = res.price;
      this.instalmentPerMonth = this.instalment / 48;
      this.holdinstal = document.getElementById("instalment");
      this.holdinstal.innerHTML = parseFloat(this.instalmentPerMonth.toString()).toFixed(2) + "$";
    })
  }
}
