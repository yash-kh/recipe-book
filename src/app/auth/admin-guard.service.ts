import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router) { }

  check = new Promise<boolean>((call)=>{
    this.authService.adminCheck().subscribe(res=>{
      let id = JSON.parse(localStorage.getItem('userData'))['id'];
      if(id in res){
        call(true)
      }
      call(false)
    });
  })


  async canActivate(){
    let check = await this.check;
    if(check){
      return true;
    }
    this.router.navigateByUrl('/recipes')
    return false;
  }
}
