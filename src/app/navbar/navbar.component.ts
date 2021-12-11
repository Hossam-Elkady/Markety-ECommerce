import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, DoCheck {
  navLink: any;
  constructor(private _AuthService: AuthService, private _CartService: CartService, private _Router: Router) {
  }
  ngDoCheck(): void {
    this.getDataLength();
  }

  name: any;
  hisName: any = sessionStorage.getItem('name');
  itemsNumbers: any;

  ngOnInit(): void {
    this.getName();
    this.getDataLength();
    this.itemsNumbers = document.getElementById('item-numbers');
    this.navLink = document.querySelectorAll(".positioning-links")
    if (sessionStorage.getItem('name')) {
      this.itemsNumbers?.classList.remove('d-none');
      for (let i = 0; i < this.navLink.length; i++) {
        this.navLink[i].classList.add("mt-3")
      }
    } else {
      this.itemsNumbers?.classList.add('d-none');
      for (let i = 0; i < this.navLink.length; i++) {
        this.navLink[i].classList.remove("mt-3")
      }
    }
  }

  getDataLength() {
    this._CartService.getCartItems(JSON.stringify(sessionStorage.getItem("MarketyEmail"))).subscribe(res => {
      this.itemsNumbers.innerHTML = res.length
    })
  }

  logedOut: any;
  loggedIn: any;
  login: any;
  clicked: boolean = false;

  getName() {
    this._AuthService.user.subscribe((res) => {
      this.name = res;
      this.hisName = sessionStorage.getItem('name');
      this.loggedIn = document.getElementById('loggedIn');
      this.logedOut = document.getElementById('logedOut');
      this.login = document.getElementById('login');
      this.logedOut?.classList.remove('hidden');
      this.loggedIn?.classList.remove('hidden');
      this.login?.classList.add('hidden');
      this.itemsNumbers?.classList.remove('d-none');
      for (let i = 0; i < this.navLink.length; i++) {
        this.navLink[i].classList.add("mt-3")
      }
    });
  }


  signout() {
    this.login = document.getElementById('login');
    this.loggedIn = document.getElementById('loggedIn');
    this.logedOut = document.getElementById('logedOut');
    this.logedOut?.classList.add('hidden');
    this.loggedIn.classList.add('hidden');
    this.login?.classList.remove('hidden');
    this.clicked = true;
    sessionStorage.removeItem('name');
    this.itemsNumbers?.classList.add('d-none');
    for (let i = 0; i < this.navLink.length; i++) {
      this.navLink[i].classList.remove("mt-3")
    }
    sessionStorage.removeItem("MarketyEmail")
  }
}
