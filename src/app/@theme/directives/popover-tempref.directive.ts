import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[PopoverTempref]'
})
export class PopoverTemprefDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
