// default-img.directive.ts
import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'img[appDefaultImg]',
  standalone: true
})
export class DefaultImgDirective implements OnChanges {
  @Input('appDefaultImg') src: string = '';
  @Input() defaultImage: string = 'assets/defaultImg.jpg';

  constructor(private el: ElementRef) {
    this.setImage(this.defaultImage); // Set default initially
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src']) {
      this.loadImage(this.src);
    }
  }

  private setImage(src: string, isError: boolean = false) {
    const imgEl = this.el.nativeElement;
    imgEl.src = src;
    imgEl.classList.toggle('error', isError);
    imgEl.classList.toggle('loading', false);
  }
  
  private loadImage(src: string) {
    if (!src) {
      this.setImage(this.defaultImage, true);
      return;
    }
  
    const imgEl = this.el.nativeElement;
    imgEl.classList.add('loading');
    
    const img = new Image();
    img.onload = () => {
      this.setImage(src);
    };
    img.onerror = () => {
      this.setImage(this.defaultImage, true);
    };
    img.src = src;
  }
}