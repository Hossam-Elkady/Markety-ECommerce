import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  responseObject: any;

  constructor(private CartService: CartService) { }
  email = JSON.stringify(sessionStorage.getItem('MarketyEmail'));
  items: any[] = [];
  itemsDetails: any = {};
  itemQuantity: number = 1;
  Quantity: any;
  itemIndex: number = 0;
  itemPrice: any;
  totalPrice: number = 1;
  currentItemPrice: any;
  itemTotalPrice: any;
  fireBaseId: string = ""
  subtotal: any;
  sum: number = 0;
  subTotalMoney: number = 0;

  ngOnInit(): void {
    this.getItems();
    this.subtotal = document.getElementById("subtotal")?.innerHTML;
  }

  getItems() {
    this.CartService.getCartItems(this.email).subscribe((res) => {
      res.forEach((response) => {
        this.getitemCountById(response.fireBaseId)
        this.getItemsDataById(response.id)
        if (response.count != 1) {
          this.itemQuantity = response.count
        }
      })
    })

  }
  Counts: any = 5;
  getitemCountById(fireBaseId: any) {
    this.CartService.getCount(JSON.stringify(sessionStorage.getItem("MarketyEmail")), fireBaseId).subscribe(res => {
      this.Counts = res
    })
  }

  getItemsDataById(id: number) {
    this.CartService.getSingelItem(id).subscribe((e) => {
      this.items.push(e);
      this.subtotal = this.items.forEach(item => {
        this.sum += item.price
        this.subTotalMoney = this.sum
        return this.sum
      })
    });
  }

  calcSubtotal() {
    this.sum *= 0.8;
    document.getElementById("submitCoupon")?.setAttribute("disabled", "true")
    document.getElementById("getCoupon")?.setAttribute("disabled", "true")
    document.getElementById("remove")?.removeAttribute("disabled")
  }

  removeCoupon() {
    this.sum *1.2;
    document.getElementById("getCoupon")?.removeAttribute("disabled")
    document.getElementById("submitCoupon")?.removeAttribute("disabled")
    document.getElementById("remove")?.setAttribute("disabled","true")
  }

  getNumber(e: any) {
    this.itemIndex = e;
    this.Quantity = document.querySelectorAll('.Quantity')[e];
    this.itemPrice = document.querySelectorAll('.itemPrice')[e];
    this.itemTotalPrice = document.querySelectorAll(".totalPrice")[e]
    this.itemQuantity = this.Quantity.value;
    this.currentItemPrice = this.itemPrice.innerHTML;
    this.itemTotalPrice.innerHTML = this.itemQuantity * this.currentItemPrice;
  }

  addCoupon() {
    if (document.getElementById("Coupon")?.classList.contains("d-none")) {
      document.getElementById("PROMOTION")?.classList.remove("fa-plus")
      document.getElementById("PROMOTION")?.classList.add("fa-minus")
      document.getElementById("PROMOTION")?.classList.add("addingCoupon")
      document.getElementById("PROMOTION")?.classList.remove("spinReverse")
    }
    else {
      document.getElementById("PROMOTION")?.classList.add("fa-plus")
      document.getElementById("PROMOTION")?.classList.remove("fa-minus")
      document.getElementById("PROMOTION")?.classList.remove("addingCoupon")
      document.getElementById("PROMOTION")?.classList.add("spinReverse")
    }
    document.getElementById("Coupon")?.classList.toggle("d-none")
  }

}
