import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { User } from '../../../models/user.model';
import { Category } from 'src/app/models/category.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories: Category []=[];
  activeMenu = false;
  counter = 0;
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesServices:CategoriesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.categoriesServices.getAll().subscribe(cat=>{
      this.categories=cat;
    });
    this.authService.user$.subscribe(data=>{
      this.profile=data
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('john@mail.com', 'changeme')
    .subscribe(user => {
      this.router.navigate(['/profile'])
    });
  }

  logout(){
    this.authService.logout();
    this.profile=null;
    this.router.navigate(['/home'])
  }
}
