import { Component, Input, OnInit } from '@angular/core';
import { NbPopoverComponent, NbPositionedContainer, NbRenderableContainer } from '@nebular/theme';

@Component({
  selector: 'app-popover-documento',
  template: `<nb-list>
  <nb-list-item>
    <img class="" alt="foto" height="150"
      src="assets/ext/{{context.doc.formato}}.png">
  </nb-list-item>
  <nb-list-item>
    Formato: {{ context.doc.formato }}
  </nb-list-item>
  <nb-list-item>
    Peso maximo (mb): {{ context.doc.peso_max }}
  </nb-list-item>
  <nb-list-item>
    {{ (context.doc.requerido === 'a')? 'Obligatorio' : 'Opcional' }}
  </nb-list-item>
</nb-list>`,
  styleUrls: ['./popover-documento.component.scss']
})
export class PopoverDocumentoComponent extends NbPositionedContainer implements NbRenderableContainer {
  content: any;
  context: any;

  renderContent() {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void { }

}
