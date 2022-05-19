import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuActiveItem = [
    'text-muted',
    'text-muted',
    'text-muted',
    'text-muted',
    'text-muted',
  ]

  constructor(
    private route: Router,
    private authService: AuthService
  ) {
    this.route.events.subscribe(data => {
      if(data instanceof NavigationEnd) {
        const currentURL = data.url;
        this.menuActiveItem = [
          'text-muted',
          'text-muted',
          'text-muted',
          'text-muted',
          'text-muted',
        ]
        if (currentURL.search('main') == (currentURL.length - 4)) {
          this.menuActiveItem[0] = 'text-dark'
        }
        if (currentURL.search('categor') != -1) {
          this.menuActiveItem[1] = 'text-dark'
        }
        if (currentURL.search('product') != -1) {
          this.menuActiveItem[2] = 'text-dark'
        }
        if (currentURL.search('order') != -1) {
          this.menuActiveItem[3] = 'text-dark'
        }
        if (currentURL.search('profile') != -1) {
          this.menuActiveItem[4] = 'text-dark'
        }
      }
    })
  }

  //-------lifecycle-------//
  ngOnInit(): void {
  }

  //--------handle--------//
  handleLogout() {
    this.authService.logout()
    this.route.navigate(['login'])
  }

}
