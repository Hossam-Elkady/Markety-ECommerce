import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private _Router: Router, private _AuthService: AuthService, private _CartService: CartService) { }

  ngOnInit(): void { }

  message: string = '';

  registered: boolean = false;

  userName: string = "";

  MarketyEmail: any;

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
  loading: boolean = false;
  submit() {
    if (this.signinForm.invalid) {
      return;
    }
    this.loading = true;
    this._AuthService.signIn(this.signinForm.value).subscribe((res) => {
      if (res.message == 'success') {
        this.userName = res.user.first_name;
        this._AuthService.getUserName(res.user.first_name)
        this.registered = false;
        this._Router.navigateByUrl('home');
        this.MarketyEmail = sessionStorage.setItem("MarketyEmail", res.user.email.substring(0, res.user.email.lastIndexOf(".")))
      }
      else {
        this.loading = false;
        this.message = res.message;
        this.registered = true;
      }
    });


  }
}
