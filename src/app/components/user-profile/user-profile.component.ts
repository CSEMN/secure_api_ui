import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {Title} from "@angular/platform-browser";
import {TokenService} from "../../shared/token.service";
import {Router} from "@angular/router";

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
              ) {
    if (!token.isLoggedIn()) {
      router.navigate(['login']);
    }

    this.titleService.setTitle("API JWT | Profile");

    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data['data'];
    });
  }

  ngOnInit() {
  }
}
