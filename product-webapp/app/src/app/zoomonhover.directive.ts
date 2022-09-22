import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZoomonhover]'
})
export class ZoomonhoverDirective {

  constructor(private elementRef: ElementRef, private renderer:Renderer2) { }

  @HostListener('mouseenter')
  mouseover(){
    this.renderer.setStyle(this.elementRef.nativeElement,'transform','scale(1.0)');
    
  }
  @HostListener('mouseleave')
  mouseleave(){
    this.renderer.setStyle(this.elementRef.nativeElement,'transform','scale(0.9)');
    
  }

}
