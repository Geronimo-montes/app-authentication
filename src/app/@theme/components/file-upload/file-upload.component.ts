import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { forwardRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';

import { NbTrigger } from '@nebular/theme';
import { NbComponentStatus } from '@nebular/theme';

/**
 * Selector de archivos (unico o multiple)
 * 
 * @class FileUploadComponent 
 * @extends SelectControlValueAccessor
 */
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent extends SelectControlValueAccessor {

  /**
   * nombre, valor autentico para la asignacion de la preview img
   */
  @Input() name: string;
  /**
   * texto a presentar al inico
   */
  @Input() text: string;
  /**
   * mensaje de error
   */
  @Input() popoverError: string;
  /**
   * multiples archivos o solo uno
   */
  @Input() multiple: boolean = false;
  /**
   * templeta para el popover de error
   */
  @Input() templateRef: TemplateRef<ElementRef>;
  /**
   * contorno del dropbox
   */
  @Input() status: NbComponentStatus = 'primary';

  public hidden = true;
  public file: FileList | null = null;
  public popoverTrigger: NbTrigger = NbTrigger.HOVER;

  value: any;
  onChange: (_: any) => void;
  onTouched: () => void;

  /**
   * Evento de escucha en los cambios de seleccion de archivos
   * @param {FileList} event 
   */
  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.onChange(Array.from(event));
    this.file = event;

    document.getElementById(this.name)
      .setAttribute('src', URL.createObjectURL(event.item(0)));
    this.hidden = false;
  }

  /**
   * 
   */
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.key === c2.key : c1 === c2;
  }

  /**
   * Registra los cabios en el elemento HTML
   * @param {File[] | null} value 
   */
  writeValue(value: any): void {
    if (value === null) {
      document.getElementById(this.name).setAttribute('src', '');
      this.hidden = true;
      this.file = value;
    }
    if (value) this.value.emit(value);
  }

  /**
   * 
   * @param fn 
   */
  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  /**
   * 
   * @param fn 
   */
  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  /**
   * 
   * @param isDisabled 0
   */
  setDisabledState(isDisabled: boolean): void { }

  /**
   * 
   * @param _renderer 
   * @param _elementRef 
   */
  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef);
  }
}