import {AfterViewInit, Component, NgZone, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import {Title} from "@angular/platform-browser";

//for Google oauth
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {json} from "express";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit,AfterViewInit {
  loginForm: FormGroup;
  errors:any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private titleService:Title,
    private zone: NgZone
  ) {
    this.titleService.setTitle("API JWT | Login");
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }
  ngOnInit() {

  }
  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['profile']);
      }
    );
  }
  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }

  callback_backend(provider:string,data:any){
    return this.authService.oauth_callback(provider,data).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['profile']);
      }
    );
  }

  //for Google oauth
  auth2: any;
  @ViewChild('loginRef', {static: true}) loginElement!:ElementRef;
  ngAfterViewInit() {
    this.googleAuthSDK();
  }


  callLogin() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs
        let profile = googleAuthUser.getBasicProfile();
        // console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        const data=[{'name':profile.getName(),'id':profile.getId(),'email':profile.getEmail()}]
        this.zone.run(
          ()=>this.callback_backend('google',JSON.stringify(data))
        );

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '23453012486-7gjvl82hp6qbho6jl03469fgnfiipov1.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      // if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

}
