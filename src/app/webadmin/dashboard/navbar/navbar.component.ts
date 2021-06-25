import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  public isLogged = false;
  public user: any;


  constructor(
    public router: Router, private authSvc: AuthService
  ) { }

  async ngOnInit() {
    console.log('Navbar');
    this.user = await this.authSvc.getCurrentUser()

    if (this.user) {
      this.isLogged = true;
    }
  }

  async onLogout() {
    try{
      await this.authSvc.logout();
      this.router.navigate(['/inicio']);
    }
    catch(error){console.log(error)}

  }

}
