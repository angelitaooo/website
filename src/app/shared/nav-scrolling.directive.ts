import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appNavScrolling]'
})
export class NavScrollingDirective {
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

  mouseWheelFunc(evento: any) {
    const event = window.event || evento; // old IE support
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {
        this.mouseWheelUp.emit(event);
    } else if (delta < 0) {
        this.mouseWheelDown.emit(event);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
        event.preventDefault();
    }
  }

}
