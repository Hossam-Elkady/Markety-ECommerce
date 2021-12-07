import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    "first_name": new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    "last_name": new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    "email": new FormControl(null, [Validators.email, Validators.required]),
    "password": new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  })

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  registered: boolean = false;

  submit() {
    if (this.registerForm.invalid) {
      return
    }
    this._AuthService.signUp(this.registerForm.value).subscribe(response => {
      if (response.message == "success") {
        console.log(response)
        this.registered = false
        this._Router.navigateByUrl("login")
      }
      else {
        console.log(response)
        this.registered = true
      }
    })
  }
  ngOnInit(): void {
  }

}
