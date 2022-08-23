import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {Title} from "@angular/platform-browser";
import {TokenService} from "../../shared/token.service";
import {Router} from "@angular/router";
import {AuthStateService} from "../../shared/auth-state.service";

// User interface
export class User {
  name: any;
  email: any;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;

  constructor(public authService: AuthService,
              private titleService: Title,
              private token: TokenService,
              public router: Router,
              private authState: AuthStateService,
  ) {
    this.titleService.setTitle("API JWT | Profile");

    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data['data'];
    });
  }

  ngOnInit() {
    this.authState.userAuthState.subscribe((loggedIn) => {
      if (!loggedIn) {
        this.router.navigate(['login']);
      }
    });
  }
}
