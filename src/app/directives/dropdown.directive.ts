import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';
@Directive ({
  selector: '[appDropdown]'
})
export class DropdownDirective {
 private isOpen: boolean =false;
  constructor(private _el: ElementRef) { 
  
  }
  
  @HostBinding('class.show') get opened() {
      return this.isOpen;
  }
  @HostListener('click') open() {
      if (!this.isOpen) {
        this._el.nativeElement.querySelector('.dropdown-menu').classList.add('show');
      }
      else {
        this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
      }
        
      this.isOpen = !this.isOpen;

  }
  @HostListener('document:click', ['$event.target']) close (targetElement) {
      let inside: boolean = this._el.nativeElement.contains(targetElement);
      if(!inside) {
          this.isOpen = false;
          this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show')
      }
  }
}