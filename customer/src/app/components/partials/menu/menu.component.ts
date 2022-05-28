import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  hideMenu = 'menu-hide'

  constructor() { }

  ngOnInit(): void {
  }

  handleClickMenu() {
    this.hideMenu = (this.hideMenu === 'menu-hide') ?
    '' : 'menu-hide'
  }

  handleHideMenu() {
    this.hideMenu = 'menu-hide'
  }
}
