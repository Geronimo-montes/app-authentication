import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { Idocumento } from '../../../../@core/data/documentoModel';

@Component({
  selector: 'app-item-doc',
  templateUrl: './item-doc.component.html',
  styleUrls: ['./item-doc.component.scss']
})
export class ItemDocComponent implements OnInit {

  @Input('documento') d: Idocumento;
  @Input('badge') badge: any;
  /**
   * @description Inidica si el boton de visualizacion del popover se habilita. Por defecto su valor es true.
   */
  @Input('btnView') btnView: boolean = true;
  /**
   * @description Inidica si el boton de subidad de documentos se habilita. Por defecto su valor es true.
   */
  @Input('btnUpload') btnUpload: boolean = true;
  /**
   * @description Habilita la edición de los datos del documento desde el popover. Por defecto su valor es false.
   */
  @Input('editPopover') editTemplate: boolean = false;

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;


  public editEnable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showPopover() {
    if (this.popover.isShown)
      this.popover.hide();
    else
      this.popover.show();
  }
}
