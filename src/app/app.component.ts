import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isSignedIn!: boolean;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
  private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
  title = 'Ang10-NGX-translate';
  languageList = [
    {code: 'en', label: 'English'},
    {code: 'ar', label: 'Arabic'}
  ];


  changeLang(lang: string) {
    this.translate.use(lang);
  }
  getLang(){
    return this.translate.currentLang;
  }

  faCoffee = faCoffee;
}
