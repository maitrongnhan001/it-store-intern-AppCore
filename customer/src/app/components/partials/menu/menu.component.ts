import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  hideMenu = 'menu-hide'
  searchForm: FormGroup
  avatar: string|null = null
  firstName: string = 'Login'

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activeRouter: ActivatedRoute,
    private authService: AuthService
  ) {
    //in case have content search in query params,
    //then man it to input
    this.searchForm = new FormGroup({
      content: new FormControl("")
    })
  }

  //----------lifecycle---------//
  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(
      (params: any) => {
        if (params.search) {
          this.SearchContent.setValue(params.search)
        } else {
          this.SearchContent.setValue("")
        }
      }
    )

    this.authService.getOwnProfile().subscribe(
      (response: any) => {
        this.avatar = response.data.avatar ?? null
        this.firstName = response.data.firstName ?? 'Profile'
      }
    )
  }

  //-----------handle-----------//
  get SearchContent(): AbstractControl {
    return this.searchForm.get('content')!;
  }

  handleClickMenu() {
    this.hideMenu = (this.hideMenu === 'menu-hide') ?
      '' : 'menu-hide'
  }

  handleHideMenu() {
    this.hideMenu = 'menu-hide'
  }

  handleSearch() {
    const contentSearch = this.SearchContent.value

    if (contentSearch.length == 0) {
      this.toastr.warning("No content search", "Warning")
      return
    }

    this.router.navigate(
      ['main', 'products'],
      {
        queryParams: {
          search: contentSearch
        }
      }
    )
  }
}
