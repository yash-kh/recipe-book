import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appInputCheck]'
})
export class InputCheckDirective implements OnInit {
  isAdmin = false;
  @Input('appInputCheck') format;

  constructor(private el: ElementRef, private authService: AuthService) { }

  ngOnInit(){
    this.authService.adminCheck().subscribe(res=>{
      let id = JSON.parse(localStorage.getItem('userData'))['id'];
      if(id in res){
        this.isAdmin = true;
      }
    });
  }

  @HostListener('keypress',['$event']) onBlur(event: KeyboardEvent){
    let value: string = this.el.nativeElement.value;
    if (this.isAdmin){
      return true
    }
    return false
  }
  
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('keydown.backspace', ['$event']) onKeydownHandler(e: KeyboardEvent) {
    if (this.isAdmin){
      return true;
    }
    e.preventDefault();
  }
}


