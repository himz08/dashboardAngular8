import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  loginMsg: string = "Login successful";
  loginMsgError: string = "Login Failed!!!";
  action: string = "Dismiss";

  constructor(private services: CommonService, private router: Router) { }

  ngOnInit() {

    if (this.services.isLoggedIn()) {
      this.router.navigate(['']);
    }

    // loginForm is structured here and linked with view using binding
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]), // Validators.required will make the field required
      'password': new FormControl(null, Validators.required)
    })

  }
  login(): void {

    const options = {
      params: new HttpParams().set('email', this.loginForm.value.email).set('password', this.loginForm.value.password)
    }  // params - genrated using logged in id and pass

    // in service login function is called to check database    
    this.services.login(options)
      .subscribe((response: any) => {
        if (response.length) {
          // this block will run if db returns somthing                                             
          localStorage.setItem('userId', response[0].id);
          localStorage.setItem('fullName', response[0].fullName);
          localStorage.setItem('bookingCount', '0');
          // id and pass is stored in local storage
          this.services.openSnackBar(this.loginMsg, this.action);
          this.router.navigate(['/home/overview']);  // it will navigate to home page
        }
        else {
          this.services.openSnackBar(this.loginMsgError, this.action);
        }

      })
  }
}



